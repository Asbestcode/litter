import { initMongoose } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export default async function handler(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);
    const {username} = req.body;
    await User.findByIdAndUpdate(session.user.id, {username});
    res.json('ok')
}