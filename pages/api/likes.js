import { initMongoose } from "@/lib/mongoose";
import { getServerSession } from "next-auth";

export default async function handle(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);
    
    const postId = req.body.id;
    const userId = session.user.id
    res.json({id})
}