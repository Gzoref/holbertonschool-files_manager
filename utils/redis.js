import redis from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on("error", (error) => {
      console.log(error);
    });

    this.client.on("connect", () => {});
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
