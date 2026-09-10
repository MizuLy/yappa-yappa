const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

const sendOtp = async (email, otp) => {
  await brevo.transactionalEmails.sendTransacEmail({
    subject: "Your Yappa verification code",
    htmlContent: `<p>Your verification code is: <strong>${otp}</strong></p><p>This code expires in 5 minutes.</p>`,
    sender: { name: "Yappa Yappa", email: "mizutestapi@gmail.com" },
    to: [{ email }],
  });
};

module.exports = sendOtp;
