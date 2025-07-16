import mongoose from "mongoose";

let authConnection: mongoose.Connection | null = null;
let problemsConnection: mongoose.Connection | null = null;

export function connect_auth() {
  if (authConnection && authConnection.readyState === 1) {
    return authConnection;
  }

  try {
    const uri = process.env.MONGO_AUTH_URI!;
    const connection = mongoose.createConnection(uri);

    connection.on("connected", () => {
      console.log("Auth DB connected");
    });

    connection.on("error", (e) => {
      console.log("Auth DB error: " + e);
    });

    authConnection = connection;
    return authConnection;
  } catch (e) {
    console.log("Auth DB error: " + e);
  }
}

export function connect_problems() {
  if (problemsConnection && problemsConnection.readyState === 1) {
    return problemsConnection;
  }

  try {
    const uri = process.env.MONGO_PROBLEMS_URI!;
    const connection = mongoose.createConnection(uri);

    connection.on("connected", () => {
      console.log("Problems DB connected");
    });

    connection.on("error", (e) => {
      console.log("Problems DB error: " + e);
    });

    problemsConnection = connection;
    return problemsConnection;
  } catch (e) {
    console.log("Problems DB error: " + e);
  }
}