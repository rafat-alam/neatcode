import User from "@/models/userModel";
import bcrypt from "bcryptjs";
const nodemailer = require("nodemailer");

export const sendEmail = async ({email, emailType, userId}: any) => {
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if(emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      })
    } else if(emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      })
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0543b7c0050acf",
        pass: "bf307a78fcdac1"
      }
    });

    const mailOptions = {
      from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
      to: email,
      subject: emailType,
      text: "Hello world?",
      html: `<p>
        Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
        to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} 
        or copy and paste the link below in your browser.<br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse

  } catch(e: any) {
    throw new Error(e.message)
  }
}