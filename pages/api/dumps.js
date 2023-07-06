import {initMongoose} from "../../lib/mongoose";
import Post from "../../models/Post";
import Dump from "@/models/Dump";
import Like from "@/models/Like";
import User from "@/models/User";

export default async function handler(req, res) {
    await initMongoose();

    if (req.method === 'GET') {
      const dumps = await Dump.find()
        .sort({createdAt: -1})
        .exec()
      return res.json(dumps)
    }

    if (req.method === 'DELETE') {
      // const recentDump = await Dump.findOne().sort({ _id: -1 }).limit(1).exec();
      // const deadline = new Date(recentDump.createdAt)
      // deadline.setDate(deadline.getDate() + 14);
      // const today = new Date();
      // if (deadline > today) {
      //   const dumps = await Dump.find()
      //     .sort({createdAt: -1})
      //     .exec();
      //   return res.json({dump: dumps, modal: false})
      // } else {
      const posts = await Post.find({createdAt : { $gte : new Date(2023, 5, 1)} });
      const allText = posts.map((post) => {
        const text = post.text;
        if(text == null) {return ''};
        if(text.includes('http')) {return ''};
        const textClean = text.replace(/(\r\n|\n|\r)/gm, ' ');
        return textClean
      });
      const allWords = allText.flatMap(str => str.split(' ').filter(word => word.trim() !== '').map(word => word + ' '));
      allWords.sort(() => Math.random() - 0.5);
      const singleText = allWords.join('')
      const dump = Dump.create({text: singleText});
      await Post.deleteMany();
      await Like.deleteMany();
      await User.updateMany({}, {$set:{postCount: 0}})
      return res.json(dump);
      // }
    }
}