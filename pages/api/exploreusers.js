import { initMongoose } from "../../lib/mongoose"
import User from "../../models/User";
import Follower from "../../models/Follower";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);

    const allUsers = await User.find().exec();
    const allIds = allUsers.map(item => item._id);
    const firstFollows = await Follower.find({source:session.user.id}).exec();
    const firstIds = firstFollows.map(item => item.destination);
    const secondFollows = await Follower.find().where('source').in(firstIds).exec();
    const secondIds = secondFollows.map(item => item.destination);
return res.json({allUsers, allIds, firstIds, secondIds});
}