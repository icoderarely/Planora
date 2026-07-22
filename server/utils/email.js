import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp, type) => {
  const otpPurpose = {
    account_verification: "Account Verification",
    event_booking: "Event Booking",
    password_reset: "Password Reset",
  };

  const purpose = otpPurpose[type] || "Verification";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `${purpose} OTP`,
    text: `
Your OTP for ${purpose} is ${otp}.

This code will expire in 10 minutes.

Do not share this code with anyone.
    `,
    html: `
      <div style="margin:0;padding:40px 20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;padding:40px;border:1px solid #e5e5e5;">

          <h2 style="margin:0 0 12px;color:#111827;font-size:24px;">
            ${purpose}
          </h2>

          <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.6;">
            Use the following One-Time Password (OTP) to continue.
          </p>

          <div style="
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:18px;
            text-align:center;
            margin-bottom:24px;
          ">
            <span style="
              font-size:32px;
              font-weight:700;
              letter-spacing:8px;
              color:#111827;
            ">
              ${otp}
            </span>
          </div>

          <p style="margin:0 0 12px;color:#374151;font-size:14px;">
            This OTP is valid for <strong>10 minutes</strong>.
          </p>

          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
            If you didn't request this OTP, you can safely ignore this email.
            Never share your OTP with anyone.
          </p>

          <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;">

          <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
            This is an automated email. Please do not reply.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP email sent to ${email} for ${otpPurpose[type]}`);
};

export const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Booking Confirmed - ${eventTitle}`,
    text: `
Hi ${userName},

Your booking for "${eventTitle}" has been confirmed.

We're excited to have you! You will receive further updates if required.

Thank you for booking with us.

Regards,
The Team
    `,
    html: `
      <div style="margin:0;padding:40px 20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;padding:40px;border:1px solid #e5e5e5;">

          <h2 style="margin:0 0 12px;color:#111827;font-size:24px;">
            🎉 Booking Confirmed
          </h2>

          <p style="margin:0 0 20px;color:#4b5563;font-size:15px;line-height:1.6;">
            Hi <strong>${userName}</strong>,
          </p>

          <p style="margin:0 0 24px;color:#4b5563;font-size:15px;line-height:1.6;">
            Your booking has been successfully confirmed for:
          </p>

          <div style="
            background:#f9fafb;
            border:1px solid #e5e7eb;
            border-radius:10px;
            padding:18px;
            text-align:center;
            margin-bottom:24px;
          ">
            <span style="
              font-size:22px;
              font-weight:600;
              color:#111827;
            ">
              ${eventTitle}
            </span>
          </div>

          <p style="margin:0 0 12px;color:#374151;font-size:14px;">
            We look forward to seeing you at the event.
          </p>

          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.6;">
            If you have any questions regarding your booking, feel free to contact us.
          </p>

          <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;">

          <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">
            Thank you for choosing us.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);

  console.log(
    `Booking confirmation email sent to ${userEmail} for "${eventTitle}"`,
  );
};
