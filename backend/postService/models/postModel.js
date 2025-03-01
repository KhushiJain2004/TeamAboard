import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    createdBy: {
      type: String,
      required: true, 
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    requiredSkills: {
      type: [String], 
      default: [],
    },
    location: {
      type: String,
      default: "Remote", 
    },
    timeFrame: {
      type: String,
      default: "",
    },
    interested: [
      {
        userId: {
          type: String,
        },
        status: {
          type: String,
          enum: ["Pending", "Accepted", "Rejected"],
          default: "Pending",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
