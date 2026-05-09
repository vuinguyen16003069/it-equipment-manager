const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp, type = 'verification') {
  const subject = type === 'verification' ? 'Mã xác thực đăng ký tài khoản' : 'Mã xác thực đặt lại mật khẩu';
  const title = type === 'verification' ? 'Xác thực tài khoản' : 'Đặt lại mật khẩu';
  const message =
    type === 'verification'
      ? 'Cảm ơn bạn đã đăng ký. Vui lòng sử dụng mã OTP sau để hoàn tất đăng ký:'
      : 'Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng mã OTP sau:';

  const mailOptions = {
    from: `"IT Inventory Management" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded-lg">
        <h2 style="color: #2563eb; text-align: center;">${title}</h2>
        <p>Xin chào,</p>
        <p>${message}</p>
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1e40af; border-radius: 8px; margin: 20px 0;">
          ${otp}
        </div>
        <p>Mã này có hiệu lực trong <b>10 phút</b>. Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #6b7280; text-align: center;">Đây là email tự động, vui lòng không phản hồi.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Không thể gửi email xác thực. Vui lòng thử lại sau.');
  }
}

module.exports = { sendOtpEmail };
