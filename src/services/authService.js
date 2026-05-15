const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendOtpEmail } = require('./mailService');

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function register(username, email, password) {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }
    throw new Error('Email đã tồn tại');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOtp();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    role: 'user',
    isVerified: false,
    otp,
    otpExpires,
  });

  await newUser.save();
  await sendOtpEmail(email, otp, 'verification');
  return { email: newUser.email };
}

async function verifyOtp(email, otp) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  if (user.isVerified) {
    throw new Error('Tài khoản đã được xác thực');
  }
  if (user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error('Mã OTP không hợp lệ hoặc đã hết hạn');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  return true;
}

async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Tên đăng nhập không tồn tại');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu không đúng');
  }

  if (!user.isVerified) {
    throw new Error('Tài khoản chưa được xác thực. Vui lòng kiểm tra email.');
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role, avatar: user.avatar },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    },
  );
  return token;
}

async function getUserById(id) {
  return User.findById(id).select('-password');
}

async function changePassword(id, currentPassword, newPassword) {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('Người dùng không tồn tại.');
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Mật khẩu hiện tại không đúng.');
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
}

async function forgotPassword(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email không tồn tại trong hệ thống');
  }

  const otp = generateOtp();
  user.otp = otp;
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await sendOtpEmail(email, otp, 'forgot_password');
  return true;
}

async function resetPassword(email, otp, newPassword) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  if (user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error('Mã OTP không hợp lệ hoặc đã hết hạn');
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  return true;
}

async function updateAvatar(userId, avatarUrl) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('Người dùng không tồn tại');
  }
  user.avatar = avatarUrl;
  await user.save();
  return user;
}

module.exports = {
  register,
  login,
  getUserById,
  changePassword,
  verifyOtp,
  forgotPassword,
  resetPassword,
  updateAvatar,
};
