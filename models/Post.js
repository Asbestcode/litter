import mongoose, {model, models, Schema} from "mongoose";

const PostSchema = new Schema({
  author: {type:mongoose.Types.ObjectId, ref: 'User'},
  text: String,
  likesCount: {type:Number, default: 0},
  comments: {type: [Schema.Types.ObjectId], ref: 'Comment'},
}, {
  timestamps: true,
});


const Post = models?.Post || model('Post', PostSchema);
export default Post;