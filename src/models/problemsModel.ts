import mongoose from 'mongoose';

const problemsSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, unique: true },
  difficulty: { type : Number },
  content: { type: String },
});

export function getProblemsModel(connection: mongoose.Connection) {
  return connection.models.Problems || connection.model("Problems", problemsSchema);
}