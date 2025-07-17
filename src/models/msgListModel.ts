import mongoose from 'mongoose';

const messageEntrySchema = new mongoose.Schema({
  roomid: { type: String, required: true },
  username: { type: String, required: true },
  lastmsg: { type: String, required: true },
  lastmsgtime: { type: Date, required: true },
  msgcount: { type: Number, default: 0 }
}, { _id: false });

const msglistSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user: { type: [messageEntrySchema], default: [] }
});

export function getMSGListModel(connection: mongoose.Connection) {
  return connection.models.MSGList || connection.model("MSGList", msglistSchema);
}