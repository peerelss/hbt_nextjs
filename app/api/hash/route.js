import clientPromise from "../../lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("miner_db_big_lake");
        const miners = await db.collection("miners_hashrate").find({}).toArray();

        return Response.json(miners);
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500 }
        );
    }
}
