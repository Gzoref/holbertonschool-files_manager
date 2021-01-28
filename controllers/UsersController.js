import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import crypto from 'crypto';

const hash = crypto.getHashes();

class UsersController {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  static postNew(request, response) {
    if (!this.email)
      response.status(400).send('<issing email');
    if (!this.password)
      response.status(400).send('Missing password');

    try {
      const redis = redisClient.isAlive();
      const db = dbClient.isAlive();
      const users = db.collection('users');
    } catch (error) {
      console.log(error);
    }
    const hashPwd = crypto.createHash('sha1').update(this.password).digest('hex');
    // const key = {'email': this.email};
    const newUser = users.update({'email': this.email}, {'password': hashPwd}, upsert=true);
    response.status(201).send({newUser});
  }
}

export default UsersController;
