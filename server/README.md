# ExamVector API Server

This is the backend API server for the ExamVector platform, designed to handle high traffic with Redis caching and load balancing.

## Features

- **Redis Caching**: Implements efficient caching to reduce database load and improve response times
- **Load Balancing**: Uses NGINX to distribute traffic across multiple API instances
- **Rate Limiting**: Prevents abuse by limiting requests per IP address
- **Containerization**: Docker setup for easy deployment and scaling
- **High Availability**: Multiple server instances with health checks

## Architecture

```
┌─────────────┐      ┌─────────────┐
│   Client    │──────▶   NGINX     │
│  Browsers   │      │Load Balancer│
└─────────────┘      └──────┬──────┘
                            │
                            ▼
┌─────────────┐      ┌──────┴──────┐
│             │      │             │
│    Redis    │◀────▶│  API Servers│
│   Cache     │      │  (Multiple  │
│             │      │  Instances) │
└─────────────┘      └─────────────┘
```

## Prerequisites

- Node.js 18 or higher
- Redis server
- Docker and Docker Compose (for containerized deployment)

## Local Development Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start Redis server:

```bash
# If you have Redis installed locally
redis-server

# Or using Docker
docker run --name redis -p 6379:6379 -d redis:alpine
```

4. Start the development server:

```bash
npm run dev
```

## Docker Deployment

To deploy the entire stack with load balancing and multiple API instances:

```bash
# From the project root directory
docker-compose up -d
```

This will start:
- 4 API server instances
- 1 Redis cache server
- 1 NGINX load balancer
- 1 Frontend server

## Scaling

To scale the number of API instances:

```bash
docker-compose up -d --scale api=6
```

## Load Testing

You can use tools like Apache Benchmark or k6 to test the performance:

```bash
# Example with Apache Benchmark (100 requests with 10 concurrent users)
ab -n 100 -c 10 http://localhost/api/exams
```

## Monitoring

The API includes a health check endpoint at `/health` that can be used for monitoring.

## Redis Cache Management

The cache middleware automatically handles caching of API responses. Cache TTL (Time To Live) is configurable per endpoint in the routes.

To manually clear the cache:

```bash
# Connect to Redis CLI
redis-cli

# Clear all keys matching a pattern
KEYS "cache:/api/exams*" | xargs redis-cli DEL
```

## Security Considerations

- The NGINX configuration includes security headers
- Rate limiting is implemented to prevent abuse
- All containers run with the least privileges needed

## Contributing

Please follow the existing code style and add tests for any new features.