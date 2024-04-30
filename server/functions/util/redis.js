const redis = require('redis');

const client = redis.createClient({
    password: 'nrzSvVIWr3xWWjTNG6RFypoEnOAzt8qv',
    socket: {
        host: 'redis-12349.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12349
    }
});

(async () => {
    await client.connect();
})();
client.on('connect', () => {
    // console.log('Redis client connected');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = client;