import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: Date, required: true }
}, { _id: false });

const roomSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  messages: { type: [messageSchema], default: [] }
});

export function getRoomModel(connection: mongoose.Connection) {
  return connection.models.Room || connection.model("Room", roomSchema);
}