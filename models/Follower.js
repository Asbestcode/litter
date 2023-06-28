import mongoose, {model, models, Schema} from "mongoose";

const FollowerSchema = new Schema({
  who: {type:mongoose.Types.ObjectId, required:true},
  whom: {type:mongoose.Types.ObjectId, required:true},
});

const Follower = models?.Follower || model('Follower', FollowerSchema);

export default Follower;