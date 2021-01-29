// import crypto from 'crypto';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

// const hash = crypto.getHashes();

class UsersController {
  static async postNew(request, response) {
    const email = request.body.email;
    const password = request.body.password;
    // console.log("EMAIL", email, "PASSWORD", password);
    // response.json({email, password});
    if (!email)
      response.status(400).send('Missing email');
    if (!password)
      response.status(400).send('Missing password');

    // const hashPwd = crypto.createHash('sha1').update(this.password).digest('hex');
    const hashPwd = sha1(password);

    try {
      const redisUp = redisClient.isAlive();
      const dbUp = dbClient.isAlive();
      const db = dbClient.db;
      const collection = db.collection('users');

      const user1 = await collection.findOne({email: email});
      // console.log('USER 1', user1);
      if (user1) {
	console.log('COUNT BEFORE NEW', await collection.countDocuments());
	response.status(400).json({error: 'Already exist'});
      } else {
      	collection.insertOne({email: email, password: hashPwd});
	const newUser = await collection.findOne({email: email});
	console.log('COUNT AFTER NEW', await collection.countDocuments());
	response.status(200).send(newUser);
      }

      // const findDoc = (db, callback) => {
      // 	// collection.find({email: email}).toArray( async (err, result) => {
      // 	collection.find({email: email}).toArray( async (err, result) => {
      // 	  if (err) throw err;
      // 	  console.log('FOUND RESULT', result);
      // 	  console.log('COUNT', await collection.countDocuments());
      // 	  if (result.length != 0)
      // 	    response.status(400).json({error: 'Already exists'});
      // 	  else {
      // 	    // const user = collection.insertOne({email: email, password: hashPwd});
      // 	    collection.insertOne({email: email, password: hashPwd});
      // 	    const user = collection.find({email: email});
      // 	    console.log('USER', user);
      // 	    response.status(200).json({user});
      // 	  }
      // 	});
      // }
      // const findDocs = (db, callback) => {
      // 	collection.find({}).toArray( async (err, docs) => {
      // 	  if (err) throw err;
      // 	  console.log('Found these docs');
      // 	  console.log(docs);
      // 	  console.log('COUNT', await collection.countDocuments());
      // 	  // callback(docs);
      // 	});
      // }
      // findDoc();
      // findDocs();
      // console.log(findDocs());
      	// if (!result)
      	//   response.status(400).send('Already exists');
      	// else {
      	//   const user = collection.insertOne({email: email, password: hashPwd});
      	// };
	// console.log(collection);
      	// response.send(user);
      	// ressponse.status(200).json({user});
    } catch (error) {
      console.log(error);
    }
    // ressponse.json({
  }
};
      // const redis = redisClient.isAlive();
      // const db = dbClient();
      // const users = dbClient.collection('users');
      // response.json({users});


    // const key = {'email': email};
    // const value = {'email': email,'password': hashPwd};
    // const newUser = users.update(key, {$setOnInsrt: value}, upsert=true);
    // const newUser = db.users.insert({'email': email}, {'password': hashpwed});
    // const newUser = users.update({'email': email}, {$setOnInsrt: {'password': hashpwed}}, upsert=true);
    // response.jason({email, hashpwd});
    // response.status(201).send({newUser});

export default UsersController;
// export default postNew;
