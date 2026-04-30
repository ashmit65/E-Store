import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_DATABASE_URL! as string);

redis.on('error', (err) => {
  // Gracefully handle redis errors
});

export default redis;