import clientPromise from "./mongodb";

export async function getUsers(userId) {
  try {
    const client = await clientPromise;
    const db = client.db("mining_db");
    const collection = db.collection(userId);
    console.log("db", db);
    const users = await collection.find({}, { projection: { _id: 0 } }).toArray();
    return users;
  } catch (error) {
    console.error("获取用户数据失败:", error);
    return [];
  }
}
// 获取总体数据
export async function getSummary( ) {
    try {
      const client = await clientPromise;
      const db = client.db("mining_db");
      const collection = db.collection('total_box');
      console.log("db", db);
      const users = await collection.find({}, { projection: { _id: 0 } }).toArray();
      return users;
    } catch (error) {
      console.error("获取用户数据失败:", error);
      return [];
    }
  }