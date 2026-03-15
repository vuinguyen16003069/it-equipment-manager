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
    role: 'viewer',
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

module.exports = { register, login };
