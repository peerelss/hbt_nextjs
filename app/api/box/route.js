import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const miners = await client.db().collection("miners").find().toArray();
  return Response.json(miners);
}

export async function POST(req) {
  const { ip, miner_box_id } = await req.json();
  const client = await clientPromise;
  const result = await client.db().collection("miners").insertOne({ ip, miner_box_id });
  return Response.json({ insertedId: result.insertedId });
}

export async function PUT(req) {
  const { id, ip, miner_box_id } = await req.json();
  const client = await clientPromise;
  await client.db().collection("miners").updateOne(
    { _id: new ObjectId(id) },
    { $set: { ip, miner_box_id } }
  );
  return Response.json({ success: true });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const client = await clientPromise;
  await client.db().collection("miners").deleteOne({ _id: new ObjectId(id) });
  return Response.json({ success: true });
}
