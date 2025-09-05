// app/api/getIps/route.ts
import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";
export async function GET(req ) {
  try {
    const { searchParams } = new URL(req.url);
    const site_id = searchParams.get("site_id");

    if (!site_id) {
      return NextResponse.json(
        { error: "缺少参数 site_id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("miner_db_big_lake"); // 这里是数据库名
    const collection = await db.collection("miners_big_lake")

    const docs = await collection
      .find({ site_id }, { projection: { ip: 1, _id: 0 } })
      .toArray();

    const ipList = docs.map((d) => d.ip);

    return NextResponse.json({ site_id, ip_list: ipList });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
}
