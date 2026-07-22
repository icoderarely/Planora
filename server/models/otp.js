import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      enum: ["account_verification", "event_booking"],
    },
    createdAt: {
      type: Date,
      expires: 600, // Delete document 10 minutes after createdAt
    },
  },
  {
    timestamps: true,
  },
);

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
