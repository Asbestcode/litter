import {initMongoose} from "../../lib/mongoose";
import Post from "../../models/Post";
import Like from "@/models/Like";
import Follower from "@/models/Follower";
import User from "@/models/User";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handler(req, res) {
    await initMongoose();
    const session = await getServerSession(req,res,authOptions);

    if (req.method === 'GET') {
        const {id} = req.query;
        if (id) {
            const post = await Post.findById(id)
                .populate('author')
                .populate({
                    path: 'parent',
                    populate: 'author',
                })
            return res.json(post)
        } else {
            const parent = req.query.parent || null;
            const author = req.query.author;
            let searchFilter;
            if (!author && !parent) {
                const userFollows = await Follower.find({source:session.user.id}).exec();
                const idsOfPeopleUserFollows = userFollows.map(item => item.destination);
                console.log(idsOfPeopleUserFollows);
                searchFilter = {author:[...idsOfPeopleUserFollows, session.user.id]};
            };
            if (author) {
                searchFilter = {author};
            };
            if (parent) {
                searchFilter = {parent};
            };
            const posts = await Post.find(searchFilter)
                .populate('author')
                .populate({
                    path: 'parent',
                    populate: 'author',
                })
                .sort({createdAt: -1})
                .limit(20)
                .exec();
            const postsLikedByUser = await Like.find({
                author: session.user.id,
                post: posts.map(item => item._id)
            })
            const idsLikedByUser = postsLikedByUser.map(item => item.post);
            return res.json({
                posts,
                idsLikedByUser
            })
        }
    }

    if (req.method === 'POST') {
        const {text, parent, images} = req.body;
        const post = await Post.create({
          author:session.user.id,
          text,
          parent,
          images
        });
        if (parent) {
            const parentPost = await Post.findById(parent);
            parentPost.commentsCount = await Post.countDocuments({parent});
            await parentPost.save();
        }
        return res.json(post);
    }
}