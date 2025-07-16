import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  isEditor: { type: Boolean, default: false}
});

export function getUserModel(connection: mongoose.Connection) {
  return connection.models.User || connection.model("User", userSchema);
}