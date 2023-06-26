import {initMongoose} from "../../lib/mongoose";
import Post from "../../models/Post";
import Comment from "@/models/Comment";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handler(req, res) {
    await initMongoose();
    const session = await getServerSession(req,res,authOptions);

    if (req.method === 'POST') {
        const {text} = req.body;
        const postId = req.body.id;
        const userId = session.user.id
        const post = await Post.create({
          author:session.user.id,
          text,
        });
        return res.json(post);
    }
}