// routes/interviewRoutes.js
import express from "express";
import Interview from "../models/Interview.js";
import { io } from "../server.js"; // ✅ import io

const router = express.Router();

// Send interview invitation
router.post("/invite", async (req, res) => {
  try {
    const { candidateId, position, date } = req.body;

    // Save interview to DB
    const interview = new Interview({
      candidateId,
      position,
      date,
    });
    await interview.save();

    // ✅ Emit real-time event to frontend
    io.emit("interviewInvite", {
      _id: interview._id,
      candidateId,
      position,
      date,
      message: `You are invited for an interview for ${position}`,
    });

    res.status(201).json({ success: true, interview });
  } catch (err) {
    console.error("Error creating interview:", err);
    res.status(500).json({ success: false, error: "Failed to schedule interview" });
  }
});

export default router;
