import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection
    connection.on("connected", () => {
      console.log("db connected")
    })
    connection.on("error", (e) => {
      console.log('db err : ' + e)
      process.exit()
    })
  } catch(e) {
    console.log(e)
  }
}