import clientPromise from "../../lib/mongodb";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db("miner_db_big_lake"); // 数据库名
  return db.collection("miners_big_lake");
}


export async function POST(req) {
  try {
    const body = await req.json();
    const {site_id: site_id, result} = body;

    if (!site_id || !Array.isArray(result)) {
      return Response.json({error: "缺少参数 site_id 或 miners"}, {status: 400});
    }

    const collection = await getCollection();
    await collection.deleteMany({site_id});
    const docs = result.map((item) => ({...item, site_id}));
    if (docs.length > 0) {
      await collection.insertMany(docs);
    }

    return Response.json({success: true, inserted: docs.length});
  } catch (error) {
    return Response.json({error: error.message}, {status: 500});
  }
}