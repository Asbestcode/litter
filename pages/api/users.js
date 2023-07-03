import { initMongoose } from "../../lib/mongoose"
import User from "../../models/User";
import Follower from "../../models/Follower";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import Post from "@/models/Post";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'PUT') {
    const {username} = req.body;
    await User.findByIdAndUpdate(session.user.id, {username});
    res.json('ok');
  }
  if (req.method === 'GET') {
    const {id,username} = req.query;
    const user = id
      ? await User.findById(id)
      : await User.findOne({username});
    const follow = await Follower.findOne({
      source:session.user.id,
      destination:user._id
    });
    return res.json({user,follow});
  }
}

// it's true