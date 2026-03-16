const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },

    message: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["private", "group"],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);