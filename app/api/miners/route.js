import clientPromise from "../../lib/mongodb";

async function getCollection() {
  const client = await clientPromise;
  const db = client.db("miner_db_big_lake"); // 数据库名
  return db.collection("miners_big_lake");
}

// ✅ 查询所有 miners
export async function GET() {
  try {
    const collection = await getCollection();
    const miners = await collection.find({}).toArray();
    return Response.json(miners);
  } catch (error) {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}

// ✅ 添加 miners（避免重复）
export async function POST(req) {
  try {
    const body = await req.json();
    const {box_id: box_id, site_id: site_id, ips} = body;

    if (!box_id || !ips || !Array.isArray(ips)) {
      return Response.json({error: "缺少参数 box_id 或 ips"}, {status: 400});
    }

    const collection = await getCollection();
    const results = [];

    for (const ip of ips) {
      const res = await collection.updateOne(
        {ip},
        {$set: {ip, box_id: box_id, site_id: site_id}},
        {upsert: true}
      );
      if (res.upsertedCount > 0) {
        results.push(`${ip} 已添加`);
      } else if (res.modifiedCount > 0) {
        results.push(`${ip} 已更新`);
      } else {
        results.push(`${ip} 已存在`);
      }
    }

    return Response.json({messages: results});
  } catch (error) {
    return Response.json({error: error.message}, {status: 500});
  }
}

// ✅ 删除 miners
export async function DELETE(req) {
  try {
    const body = await req.json();
    const {ips} = body;

    if (!ips || !Array.isArray(ips)) {
      return new Response(JSON.stringify({error: "缺少参数 ips"}), {status: 400});
    }

    const collection = await getCollection();
    const results = [];

    for (const ip of ips) {
      const res = await collection.deleteOne({ip});
      if (res.deletedCount > 0) {
        results.push(`${ip} 删除成功`);
      } else {
        results.push(`${ip} 不存在`);
      }
    }

    return Response.json({messages: results});
  } catch (error) {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}

// ✅ 修改 box_id
export async function PUT(req) {
  try {
    const body = await req.json();
    const {ip, box_id} = body;

    if (!ip || !box_id) {
      return new Response(JSON.stringify({error: "缺少参数 ip 或 box_id"}), {status: 400});
    }

    const collection = await getCollection();
    const res = await collection.updateOne(
      {ip},
      {$set: {box_id}}
    );

    if (res.matchedCount === 0) {
      return new Response(JSON.stringify({message: `${ip} 不存在`}), {status: 404});
    }

    return Response.json({message: `${ip} 已更新为 box_id=${box_id}`});
  } catch (error) {
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
}