import {initMongoose} from "../../lib/mongoose";
import Post from "../../models/Post";
import Like from "@/models/Like";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handler(req, res) {
    await initMongoose();
    const session = await getServerSession(req,res,authOptions);

    if (req.method === 'GET') {
        const {id} = req.query;
        if (id) {
            const post = await Post.findById(id).
                populate('author')
                populate('comments');
            res.json(post)
        } else {
            const posts = await Post.find()
                .populate('author')
                .populate('comments')
                .sort({createdAt: -1})
                .limit(20)
                .exec();
            const postsLikedByUser = await Like.find({
                author: session.user.id,
                post: posts.map(item => item._id)
            })
            const idsLikedByUser = postsLikedByUser.map(item => item.post);
            res.json({
                posts,
                idsLikedByUser
            })
        }
    }

    if (req.method === 'POST') {
        const {text} = req.body;
        const post = await Post.create({
          author:session.user.id,
          text,
        });
        res.json(post);
    }
}