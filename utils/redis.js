import redis from "redis";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const result = await this.clientGet(key);
    return result;
  }

  async set(key, value, durationn) {
    await this.clientSet(key, value, "expiiration", durationn);
  }

  async del(key) {
    await this.clientDel(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;