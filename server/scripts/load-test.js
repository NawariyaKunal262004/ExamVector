/**
 * Load Testing Script for ExamVector API
 * 
 * This script performs load testing on the API to verify performance
 * under heavy traffic conditions, testing both Redis caching and load balancing.
 */

import http from 'http';
import https from 'https';
import { performance } from 'perf_hooks';
import { createInterface } from 'readline';

// Configuration
const config = {
  host: 'localhost',
  port: 80,  // Default NGINX port
  path: '/api/exams',
  method: 'GET',
  concurrentUsers: 50,
  requestsPerUser: 20,
  delayBetweenRequests: 100, // ms
  useHttps: false,
};

// Statistics
let completedRequests = 0;
let successfulRequests = 0;
let failedRequests = 0;
let totalResponseTime = 0;
let minResponseTime = Number.MAX_SAFE_INTEGER;
let maxResponseTime = 0;
let responseTimes = [];

// Start the load test
async function startLoadTest() {
  console.log('\nExamVector API Load Testing Tool');
  console.log('===============================\n');
  
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  // Get user input for test configuration
  config.host = await question(readline, `Target host (${config.host}): `) || config.host;
  config.port = parseInt(await question(readline, `Port (${config.port}): `)) || config.port;
  config.path = await question(readline, `API path (${config.path}): `) || config.path;
  config.concurrentUsers = parseInt(await question(readline, `Concurrent users (${config.concurrentUsers}): `)) || config.concurrentUsers;
  config.requestsPerUser = parseInt(await question(readline, `Requests per user (${config.requestsPerUser}): `)) || config.requestsPerUser;
  config.delayBetweenRequests = parseInt(await question(readline, `Delay between requests in ms (${config.delayBetweenRequests}): `)) || config.delayBetweenRequests;
  const httpsResponse = await question(readline, `Use HTTPS? (y/N): `);
  config.useHttps = httpsResponse.toLowerCase() === 'y';
  
  readline.close();
  
  // Display test configuration
  console.log('\nTest Configuration:');
  console.log('-----------------');
  console.log(`Target: ${config.useHttps ? 'https' : 'http'}://${config.host}:${config.port}${config.path}`);
  console.log(`Concurrent Users: ${config.concurrentUsers}`);
  console.log(`Requests per User: ${config.requestsPerUser}`);
  console.log(`Total Requests: ${config.concurrentUsers * config.requestsPerUser}`);
  console.log(`Delay Between Requests: ${config.delayBetweenRequests}ms`);
  
  console.log('\nStarting load test...');
  const startTime = performance.now();
  
  // Create user sessions
  const userPromises = [];
  for (let i = 0; i < config.concurrentUsers; i++) {
    userPromises.push(simulateUser(i));
  }
  
  // Wait for all users to complete their requests
  await Promise.all(userPromises);
  
  const endTime = performance.now();
  const totalDuration = (endTime - startTime) / 1000;
  
  // Calculate statistics
  const avgResponseTime = totalResponseTime / successfulRequests;
  const requestsPerSecond = successfulRequests / totalDuration;
  
  // Calculate percentiles
  responseTimes.sort((a, b) => a - b);
  const p50 = calculatePercentile(responseTimes, 50);
  const p90 = calculatePercentile(responseTimes, 90);
  const p95 = calculatePercentile(responseTimes, 95);
  const p99 = calculatePercentile(responseTimes, 99);
  
  // Display results
  console.log('\nLoad Test Results:');
  console.log('-----------------');
  console.log(`Total Duration: ${totalDuration.toFixed(2)} seconds`);
  console.log(`Completed Requests: ${completedRequests}`);
  console.log(`Successful Requests: ${successfulRequests}`);
  console.log(`Failed Requests: ${failedRequests}`);
  console.log(`Requests Per Second: ${requestsPerSecond.toFixed(2)}`);
  console.log('\nResponse Time Statistics:');
  console.log(`  Min: ${minResponseTime.toFixed(2)}ms`);
  console.log(`  Max: ${maxResponseTime.toFixed(2)}ms`);
  console.log(`  Average: ${avgResponseTime.toFixed(2)}ms`);
  console.log(`  P50 (Median): ${p50.toFixed(2)}ms`);
  console.log(`  P90: ${p90.toFixed(2)}ms`);
  console.log(`  P95: ${p95.toFixed(2)}ms`);
  console.log(`  P99: ${p99.toFixed(2)}ms`);
  
  console.log('\nLoad test completed!');
}

// Simulate a user making multiple requests
async function simulateUser(userId) {
  for (let i = 0; i < config.requestsPerUser; i++) {
    await makeRequest(userId, i);
    
    // Add delay between requests
    if (config.delayBetweenRequests > 0 && i < config.requestsPerUser - 1) {
      await new Promise(resolve => setTimeout(resolve, config.delayBetweenRequests));
    }
  }
}

// Make a single HTTP request
async function makeRequest(userId, requestId) {
  return new Promise((resolve) => {
    const requestStart = performance.now();
    
    const options = {
      hostname: config.host,
      port: config.port,
      path: config.path,
      method: config.method,
      headers: {
        'User-Agent': `ExamVector-LoadTest/1.0 (User-${userId})`,
      }
    };
    
    // Choose HTTP or HTTPS
    const httpClient = config.useHttps ? https : http;
    
    const req = httpClient.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const requestEnd = performance.now();
        const responseTime = requestEnd - requestStart;
        
        completedRequests++;
        
        if (res.statusCode >= 200 && res.statusCode < 300) {
          successfulRequests++;
          totalResponseTime += responseTime;
          responseTimes.push(responseTime);
          
          // Update min/max response times
          minResponseTime = Math.min(minResponseTime, responseTime);
          maxResponseTime = Math.max(maxResponseTime, responseTime);
          
          // Progress indicator
          process.stdout.write('.');
        } else {
          failedRequests++;
          process.stdout.write('F');
        }
        
        // Print progress every 100 requests
        if (completedRequests % 100 === 0) {
          const progress = (completedRequests / (config.concurrentUsers * config.requestsPerUser) * 100).toFixed(1);
          process.stdout.write(` ${progress}% `);
        }
        
        resolve();
      });
    });
    
    req.on('error', (error) => {
      failedRequests++;
      completedRequests++;
      process.stdout.write('E');
      resolve();
    });
    
    req.end();
  });
}

// Helper function to calculate percentiles
function calculatePercentile(sortedArray, percentile) {
  if (sortedArray.length === 0) return 0;
  
  const index = Math.ceil((percentile / 100) * sortedArray.length) - 1;
  return sortedArray[index];
}

// Helper function for readline prompts
function question(readline, query) {
  return new Promise((resolve) => {
    readline.question(query, (answer) => {
      resolve(answer);
    });
  });
}

// Start the load test
startLoadTest().catch(err => {
  console.error('Error during load test:', err);
  process.exit(1);
});