import {model, models, Schema} from "mongoose";

const DumpSchema = new Schema({
  text: String,
}, {
  timestamps: true,
});

const Dump = models?.Dump || model('Dump', DumpSchema);
export default Dump;