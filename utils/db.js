import mongo, { MongoClient } from "mongodb";

const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 27017;
const databse = process.env.DB_DATABASE || "files_manager";

const url = `mongodb://${host}:${port}/`;

class DBClient {
  constructor() {
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (error) console.log(error);
      console.log("Connection Succesful");
      this.db = client.db(databse);
      this.client.createCollection("users");
      this.client.createCollection("files");
      console.log("Database connected");
      db.close();
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.db.collection('users').count();
  }

  async nbFiles() {}
}

const dbClient = new DBClient();
export default dbClient;
