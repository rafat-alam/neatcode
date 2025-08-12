import mongoose from 'mongoose';

const problemsSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, unique: true },
  difficulty: { type : Number },
  content: { type: String },
  testcases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
    }
  ],
  timelimit: { type : Number, required: true  },
  memorylimit: { type : Number, required: true  },
});

export function getProblemsModel(connection: mongoose.Connection) {
  return connection.models.Problems || connection.model("Problems", problemsSchema);
}