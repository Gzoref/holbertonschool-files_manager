import sha1 from 'sha1';
import dbClient from '../utils/db';
import basicAuth from 'basic-auth';


class AuthController {
  static async getConnect(request, response) {
    console.log(request.headers);
    const authHeader = request.hearders.authorization;
    if (!authHeader) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    const auth =  new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    const email = auth[0];
    const pass = sha1(auth[1]);

    try {

    } catch (error) {
      console.log(error);
    }
  }
}

export default AuthController;
