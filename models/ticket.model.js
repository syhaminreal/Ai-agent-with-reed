import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: String,
    default: "TODO",
    enum: ["TODO", "IN_PROGRESS", "DONE"],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"], // Optional, but good practice to restrict values
    default: "Medium",
  },
  deadline: Date,
  helpfulNotes: String,
  relatedSkills: [String],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
