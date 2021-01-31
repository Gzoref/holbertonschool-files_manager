import sha1 from 'sha1';
import UsersController from '../controllers/UsersController';
import redisClient from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';


class AuthController {

  static async getConnect(request, response) {
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
    await redisClient.set(key, token, duration);

    response.status(200).json({ token });
  };

  static async getDisconnect(request, response) {
    const userToken = request.headers.x - token;
    const userKey = redisClient.get(userToken);
    if (!userKey) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    redisClient.del(userToken);
  }
}

export default AuthController;
