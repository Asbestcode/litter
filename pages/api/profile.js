import { initMongoose } from "@/lib/mongoose";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export default async function handler(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);
    const {username} = req.body;
    const allUser = await User.find().select('username');
    const user = await User.findById(session.user.id).select('username');
    const usernameIsTheSame = user.username === username; 
    const usernameExists = allUser.some(obj => obj.username === username);
    if(usernameIsTheSame) {
        res.json("same")
    } else if(usernameExists) {
        res.json("taken");
    } else {
        await User.findByIdAndUpdate(session.user.id, {username});
        res.json("ok");
    }
}