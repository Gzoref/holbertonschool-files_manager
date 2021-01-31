import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;
    if (!email) {
      response.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      response.status(400).json({ error: 'Missing password' });
    }

    const hashPwd = sha1(password);

    try {
      const collection = dbClient.db.collection('users');
      const user1 = await collection.findOne({ email });

      if (user1) {
        response.status(400).json({ error: 'Already exist' });
      } else {
        collection.insertOne({ email, password: hashPwd });
        const newUser = await collection.findOne(
          { email },
          { projection: { email: 1 } },
        );
        response.status(201).json({ id: newUser._id, email: newUser.email });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getMe(request, response) {
    const userToken = request.header('X-Token');
    const authKey = `auth_${userToken}`;
    // console.log('USER TOKEN GET ME', userToken);
    const userKey = await redisClient.get(authKey);
    // console.log('USER KEY GET ME', userKey);
    if (!userKey) {
      response.status(401).json({ error: 'Unauthorized' });
    }
    const user = await redisClient.get(`auth_${userKey}`);
    // console.log('USER GET ME', user);
    response.json({ id: user._id, email: user.email });
  }
}

export default UsersController;
// export default postNew();
