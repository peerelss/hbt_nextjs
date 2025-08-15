import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("miner_db_big_lake");
    const miners = await db.collection("miners_big_lake").find({}).toArray();
    return Response.json(miners);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "数据库查询失败" }), { status: 500 });
  }
}