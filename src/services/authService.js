const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function register(username, password) {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('Tên đăng nhập đã tồn tại');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    role: 'user',
  });

  await newUser.save();
  return { id: newUser._id, username: newUser.username, role: newUser.role };
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

  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });
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

module.exports = { register, login, getUserById, changePassword };
