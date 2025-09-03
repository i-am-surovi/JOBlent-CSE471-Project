// server/models/Interview.js
import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    candidateEmail: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: "pending" }, // pending, accepted, rejected
  },
  { timestamps: true }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;
