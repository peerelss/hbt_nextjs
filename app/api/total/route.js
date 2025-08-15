 
import { getSummary } from "../../lib/db";

export async function GET( ) {
  try {
    
    const users = await getSummary( );
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "无法获取数据" }, { status: 500 });
  }
}
