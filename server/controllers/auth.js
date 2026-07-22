import OTP from "../models/otp.js";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";
import { sendOtpEmail } from "../utils/email.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // const user = new User({ name, email, password: hashedPassword });
  // await user.save();
  const user = await User.create({ name, email, password: hashedPassword });

  const otp = Math.flood(100_000 + Math.random() * 900_000).toString();
  console.log(`OTP for ${email}: ${otp}`);

  await OTP.create({ email, otp, action: "account_verification" });
  await sendOtpEmail(email, otp, "account_verification");

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    email: user.email,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 400);
  }

  if (!user.isVerified && user.role === "user") {
    const otp = Math.floor(100_000 + Math.random() * 900_000).toString();

    await OTP.deleteMany({ email, action: "account_verification" });

    await OTP.create({ email, otp, action: "account_verification" });
    await sendOTPEmail(email, otp, "account_verification");
    throw new AppError(
      "Accout not verified. A new OTP has been sent to your email.",
      400,
    );
  }

  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    },
  });
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const otpRecord = await OTP.findOne({
    email,
    otp,
    action: "account_verification",
  });

  if (!otpRecord) {
    throw new AppError("Invalid or expired OTP", 400);
  }

  await User.findOneAndUpdate({ email }, { isVerified: true });
  await OTP.deleteMany({ email, action: "account_verification" });

  res.json({
    success: true,
    message: "Account verified successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    },
  });
};
