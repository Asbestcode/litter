import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  author: {type:mongoose.Types.ObjectId, ref: 'user'},
  text: {type: String, required: true},
}, {
    timestamps: true,
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;