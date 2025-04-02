import nodemailer from 'nodemailer';

export const sendEmailNotification = async (email: string, message: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'New Notification',
        text: message,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${email}`)
}