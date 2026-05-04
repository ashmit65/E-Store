import Redis from 'ioredis';

const redisUrl = process.env.REDIS_DATABASE_URL;

if (!redisUrl) {
  console.warn("❌ REDIS_DATABASE_URL is missing! Redis will attempt to connect to localhost.");
} else {
  const maskedUrl = redisUrl.replace(/:[^@]+@/, ':****@');
  console.log(`📡 Redis attempting to connect to: ${maskedUrl}`);
}

const redis = new Redis(redisUrl as string, {
  maxRetriesPerRequest: 3, // Give it 3 tries
  lazyConnect: true,       
  tls: redisUrl?.startsWith('rediss://') ? {} : undefined, 
  connectTimeout: 15000,   // Increase timeout to 15 seconds
});

redis.on('error', (err) => {
  if (!(global as any).lastRedisError || Date.now() - (global as any).lastRedisError > 5000) {
    console.error("🚫 Redis Connection Error Details:", err); // Log the WHOLE error object
    (global as any).lastRedisError = Date.now();
  }
});

export default redis;