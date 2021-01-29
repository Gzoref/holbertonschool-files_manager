import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import crypto from 'crypto';

const hash = crypto.getHashes();

class UsersController {
  static postNew(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    console.log("EMAIL", email, "PASSWORD", password);
    response.json({email, password});
    if (!email)
      response.status(400).send('Missing email');
    if (!password)
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
    users.update({'email': this.email}, {'password': hashPwd}, upsert=true);
    response.status(201).send({newUser});
  }
}

export default UsersController;
