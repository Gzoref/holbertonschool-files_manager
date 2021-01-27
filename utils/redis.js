import redis from "redis";
import { promisify } from "util";

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on("error", (error) => {
      console.log("Not connected");
    });

    this.client.on("connect", (error) => {
      console.log("Connected Succesfully");
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    const result = this.client.get(key);
    return result;
  }

  async set(key, value, duration) {
    this.client.set(key, value, "expiration", duration);
  }

  async del(key) {
    await this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
