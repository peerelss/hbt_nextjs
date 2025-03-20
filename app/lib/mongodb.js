import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("请在 .env.local 文件中设置 MONGODB_URI");
}

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
