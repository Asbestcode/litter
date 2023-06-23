import { initMongoose } from "@/lib/mongoose";

export default async function handle(req, res) {
    await initMongoose();

    const {id} = req.body;
    res.json({id})
}