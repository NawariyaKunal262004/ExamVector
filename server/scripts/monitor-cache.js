/**
 * Redis Cache Monitoring Script
 * 
 * This script connects to Redis and provides statistics on cache usage,
 * including hit rates, memory usage, and most frequently accessed keys.
 */

import Redis from 'ioredis';
import dotenv from 'dotenv';
import { createInterface } from 'readline';

// Load environment variables
dotenv.config({ path: '../.env' });

// Initialize Redis client
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

// Track cache statistics
let cacheHits = 0;
let cacheMisses = 0;
let totalRequests = 0;
let keyStats = {};

// Connect to Redis monitor mode
async function startMonitoring() {
  console.log('Starting Redis cache monitoring...');
  
  // Get initial info
  const info = await redisClient.info();
  console.log('\nRedis Server Info:');
  console.log('-----------------');
  
  // Extract and display relevant info
  const infoLines = info.split('\r\n');
  const relevantSections = ['server', 'memory', 'stats', 'keyspace'];
  let currentSection = '';
  
  for (const line of infoLines) {
    if (line.startsWith('#')) {
      currentSection = line.substring(1).trim().toLowerCase();
      if (relevantSections.includes(currentSection)) {
        console.log(`\n${line.substring(1).trim()}:`);
      }
    } else if (relevantSections.includes(currentSection) && line.includes(':')) {
      console.log(`  ${line}`);
    }
  }
  
  // Start monitoring
  console.log('\nMonitoring cache operations (press Ctrl+C to exit):\n');
  
  // Create a separate connection for monitor mode
  const monitorClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
  });
  
  // Enter monitor mode
  const monitor = await monitorClient.monitor();
  
  monitor.on('monitor', (time, args) => {
    totalRequests++;
    
    // Track GET operations to calculate hit/miss ratio
    if (args[0] === 'get') {
      const key = args[1];
      
      // Track key access frequency
      if (!keyStats[key]) {
        keyStats[key] = { accesses: 0, hits: 0, misses: 0 };
      }
      keyStats[key].accesses++;
      
      // We'll determine hits/misses in the next Redis operation
    }
    
    // Check for cache hits (when a GET is followed by a non-nil response)
    if (args[0] === 'get' && args.length > 1) {
      const key = args[1];
      
      // We'll check the result in the next command
      setTimeout(async () => {
        try {
          const value = await redisClient.get(key);
          if (value) {
            cacheHits++;
            if (keyStats[key]) keyStats[key].hits++;
            process.stdout.write('H');
          } else {
            cacheMisses++;
            if (keyStats[key]) keyStats[key].misses++;
            process.stdout.write('M');
          }
          
          // Print statistics every 50 requests
          if (totalRequests % 50 === 0) {
            printStatistics();
          }
        } catch (err) {
          console.error('Error checking key:', err);
        }
      }, 100);
    }
  });
  
  // Handle user input for commands
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  console.log('\nCommands: "stats" for current statistics, "keys" for top keys, "exit" to quit');
  
  readline.on('line', async (input) => {
    const command = input.trim().toLowerCase();
    
    if (command === 'stats') {
      printStatistics();
    } else if (command === 'keys') {
      printTopKeys();
    } else if (command === 'exit') {
      console.log('Exiting...');
      await monitorClient.quit();
      await redisClient.quit();
      readline.close();
      process.exit(0);
    } else {
      console.log('Unknown command. Available commands: "stats", "keys", "exit"');
    }
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', async () => {
    console.log('\nExiting...');
    await monitorClient.quit();
    await redisClient.quit();
    readline.close();
    process.exit(0);
  });
}

// Print current statistics
function printStatistics() {
  const hitRate = totalRequests > 0 ? (cacheHits / totalRequests * 100).toFixed(2) : 0;
  
  console.log('\n\nCache Statistics:');
  console.log('-----------------');
  console.log(`Total Requests: ${totalRequests}`);
  console.log(`Cache Hits: ${cacheHits}`);
  console.log(`Cache Misses: ${cacheMisses}`);
  console.log(`Hit Rate: ${hitRate}%`);
  console.log('\nH = Hit, M = Miss (live indicators)\n');
}

// Print top accessed keys
function printTopKeys() {
  console.log('\n\nTop Accessed Keys:');
  console.log('-----------------');
  
  const sortedKeys = Object.entries(keyStats)
    .sort((a, b) => b[1].accesses - a[1].accesses)
    .slice(0, 10);
  
  if (sortedKeys.length === 0) {
    console.log('No keys accessed yet');
    return;
  }
  
  console.log('Key                                    | Accesses | Hits | Misses | Hit Rate');
  console.log('--------------------------------------------------------------------');
  
  for (const [key, stats] of sortedKeys) {
    const hitRate = stats.accesses > 0 ? (stats.hits / stats.accesses * 100).toFixed(2) : 0;
    const truncatedKey = key.length > 35 ? key.substring(0, 32) + '...' : key.padEnd(35);
    console.log(`${truncatedKey} | ${stats.accesses.toString().padStart(8)} | ${stats.hits.toString().padStart(4)} | ${stats.misses.toString().padStart(6)} | ${hitRate.padStart(7)}%`);
  }
  
  console.log('\n');
}

// Start the monitoring
startMonitoring().catch(err => {
  console.error('Error starting monitoring:', err);
  process.exit(1);
});