// import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(request, response) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    // const auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    // const email = auth[0];
    // const pass = sha1(auth[1]);

    const token = uuidv4();
    const key = `auth_${token}`;
    const duration = (60 * 60 * 24);
    await redisClient.set(key, token, duration);

    response.status(200).json({ token });
  }

  static async getDisconnect(request, response) {
    const userToken = request.header('X-Token');
    console.log('USER TOKEN DISCONNECT', userToken);
    const userKey = await redisClient.get(`auth_${userToken}`);
    console.log('USER KEY DISCONNECT', userKey);
    if (!userKey) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    await redisClient.del(`auth_${userToken}`);
    response.status(200).send('DISCONNECTED');
  }
}

export default AuthController;
