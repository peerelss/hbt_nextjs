 
import { getUsers } from "../../../lib/db";

export async function GET(request, { params }) {
  try {
    const { userId } = params;
    console.log("userId", userId);
    const users = await getUsers(userId);
    return Response.json(users);
  } catch (error) {
    return Response.json({ error: "无法获取数据" }, { status: 500 });
  }
}
