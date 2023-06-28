import {initMongoose} from "../../lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import Follower from "../../models/Follower";

export default async function handle(req, res) {
  await initMongoose();
  const session = await getServerSession(req, res, authOptions);
  const {whom} = req.body;

  const existingFollow = await Follower.findOne({whom, who:session.user.id});
  if (existingFollow) {
    await existingFollow.deleteOne({whom, who:session.user.id});
    return res.json(null);
  } else {
    const follow = await Follower.create({whom, who:session.user.id});
    return res.json(follow);
  }
}