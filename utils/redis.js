import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // Create objs
    this.client = redis.createClient();
    this.client.on('error', (error) => {
      console.error(error);
    });

    this.clientGet = promisify(this.client.get).bind(this.client);
    this.clientSet = promisify(this.client.set).bind(this.client);
    this.clientDel = promisify(this.client.del).bind(this.client);
  }

  // Methods

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.clientGet(key);
  }

  async set(key, value, duration) {
    await this.clientSet(key, value, 'EX', duration);
  }

  async del(key) {
    await this.clientDel(key);
  }
}
const redisClient = new RedisClient();
export default redisClient;
