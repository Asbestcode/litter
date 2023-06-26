import { initMongoose } from "../../lib/mongoose"
import User from "../../models/User";
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
        const {id, username} = req.query;
        if (id) {
            const user = await User.findById(id)
            return res.json({user})
        }
        const user = await User.findOne({id, username})
        return res.json({user})
    }
}