/**
 * Redis caching middleware for Express
 * Caches API responses to improve performance under heavy traffic
 */

// Cache middleware function that takes TTL (time to live) in seconds
export const cacheMiddleware = (ttl = 3600) => {
  return async (req, res, next) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Create a unique cache key based on the request URL and any query parameters
    const cacheKey = `cache:${req.originalUrl}`;
    const redisClient = req.redisClient;

    try {
      // Try to get cached response from Redis
      const cachedResponse = await redisClient.get(cacheKey);

      if (cachedResponse) {
        // If cache hit, parse the cached JSON response and send it
        const parsedResponse = JSON.parse(cachedResponse);
        console.log(`Cache hit for ${cacheKey}`);
        return res.status(200).json(parsedResponse);
      }

      // If cache miss, capture the response to cache it
      const originalSend = res.send;
      res.send = function (body) {
        // Only cache successful responses
        if (res.statusCode === 200) {
          try {
            // Store the response in Redis with the specified TTL
            redisClient.setex(cacheKey, ttl, body);
            console.log(`Cached response for ${cacheKey} with TTL ${ttl}s`);
          } catch (err) {
            console.error('Redis caching error:', err);
          }
        }
        // Call the original send method
        return originalSend.call(this, body);
      };

      next();
    } catch (err) {
      console.error('Redis middleware error:', err);
      // Continue without caching if Redis fails
      next();
    }
  };
};

// Middleware to clear cache for specific patterns
export const clearCache = (pattern) => {
  return async (req, res, next) => {
    const redisClient = req.redisClient;
    
    try {
      // Use Redis SCAN to find keys matching the pattern
      let cursor = '0';
      do {
        const [nextCursor, keys] = await redisClient.scan(
          cursor, 
          'MATCH', 
          pattern,
          'COUNT',
          100
        );
        
        cursor = nextCursor;
        
        // Delete found keys
        if (keys.length > 0) {
          await redisClient.del(...keys);
          console.log(`Cleared ${keys.length} cache keys matching ${pattern}`);
        }
      } while (cursor !== '0');
      
      next();
    } catch (err) {
      console.error('Cache clearing error:', err);
      next();
    }
  };
};