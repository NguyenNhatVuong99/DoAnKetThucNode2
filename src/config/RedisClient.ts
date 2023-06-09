import Redis, { RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
    // Redis connection options
};

const redisClient: Redis = new Redis(redisOptions);

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redisClient;
