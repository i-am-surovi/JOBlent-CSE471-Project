import * as Sentry from "@sentry/node";
import mongoose from "mongoose";
import 'dotenv/config';

// Initialize Sentry
Sentry.init({
  dsn: "https://46b17cc0907e0d8ac7c6dc296e98af91@o4509880528863232.ingest.us.sentry.io/4509880535875584",
  tracesSampleRate: 1.0,
  sendDefaultPii: true, // send personal identifiable info
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
    console.log("Database Connected");
  } catch (err) {
    console.error("Database connection error:", err);
    Sentry.captureException(err); // Send DB connection errors to Sentry
  }
};

export default connectDB;
