import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  userColor: String,
});

const User = models?.User || model('User', UserSchema);

export default User;