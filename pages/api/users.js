import { initMongoose } from "../../lib/mongoose"
import User from "../../models/User";
import Follower from "../../models/Follower";
import {getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handle(req, res) {
    await initMongoose();
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'PUT') {
        const userData = req.body;
        const name = userData.name;
        const color = userData.color;
        await User.findByIdAndUpdate(session.user.id, {username: name, userColor: color});
        return res.json('ok');
    }
    if (req.method === 'GET') {
        const {id,username} = req.query;
        const user = id
          ? await User.findById(id)
          : await User.findOne({username});
        const follow = await Follower.findOne({
          who:session.user.id,
          whom:user._id
        });
        return res.json({user, follow});
    }
}