import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import UsersController from './UsersController';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(request, response) {
    console.log(request.headers);
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    const auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    const email = auth[0];
    const pass = sha1(auth[1]);

    const token = uuidv4();
    const key = `auth_${token}`;
    const duration = (60 * 60 * 24);
    const userID = await redisClient.set(key, token, duration);

    return response.status(200).json({ token });

    try {

    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
