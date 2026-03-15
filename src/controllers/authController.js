const { loginSchema, registerSchema } = require('../helpers/validation');
const authService = require('../services/authService');

function getLogin(req, res) {
  if (req.cookies.token) {
    return res.redirect('/equipment');
  }
  res.render('auth/login', { title: 'Đăng nhập', error: null, success: null });
}

function getRegister(req, res) {
  if (req.cookies.token) {
    return res.redirect('/equipment');
  }
  res.render('auth/register', { title: 'Đăng ký', error: null, success: null });
}

async function postLogin(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.render('auth/login', { title: 'Đăng nhập', error: error.details[0].message, success: null });
  }
  try {
    const token = await authService.login(value.username, value.password);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000,
    });
    res.redirect('/equipment');
  } catch (err) {
    res.render('auth/login', { title: 'Đăng nhập', error: err.message, success: null });
  }
}

async function postRegister(req, res) {
  const { error, value } = registerSchema.validate(req.body);
  if (error) {
    return res.render('auth/register', { title: 'Đăng ký', error: error.details[0].message, success: null });
  }

  try {
    await authService.register(value.username, value.password);
    res.render('auth/login', {
      title: 'Đăng nhập',
      error: null,
      success: `Đăng ký thành công! Vui lòng đăng nhập với tên: ${value.username}`,
    });
  } catch (err) {
    res.render('auth/register', { title: 'Đăng ký', error: err.message, success: null });
  }
}

function logout(_req, res) {
  res.clearCookie('token');
  res.redirect('/auth/login');
}

async function getProfile(req, res, next) {
  try {
    const user = await authService.getUserById(req.user.id);
    res.render('profile', {
      title: 'Hồ sơ cá nhân',
      profile: user,
      error: null,
      success: null,
      request: req,
    });
  } catch (err) {
    next(err);
  }
}

async function postChangePassword(req, res) {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    const user = await authService.getUserById(req.user.id);
    return res.render('profile', {
      title: 'Hồ sơ cá nhân',
      profile: user,
      error: 'Mật khẩu mới phải có ít nhất 6 ký tự.',
      success: null,
      request: req,
    });
  }
  if (newPassword !== confirmNewPassword) {
    const user = await authService.getUserById(req.user.id);
    return res.render('profile', {
      title: 'Hồ sơ cá nhân',
      profile: user,
      error: 'Mật khẩu xác nhận không khớp.',
      success: null,
      request: req,
    });
  }
  try {
    await authService.changePassword(req.user.id, currentPassword, newPassword);
    const user = await authService.getUserById(req.user.id);
    res.render('profile', {
      title: 'Hồ sơ cá nhân',
      profile: user,
      error: null,
      success: 'Đổi mật khẩu thành công!',
      request: req,
    });
  } catch (err) {
    const user = await authService.getUserById(req.user.id);
    res.render('profile', {
      title: 'Hồ sơ cá nhân',
      profile: user,
      error: err.message,
      success: null,
      request: req,
    });
  }
}

function getSettings(req, res) {
  res.render('settings', {
    title: 'Cài đặt',
    request: req,
  });
}

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  logout,
  getProfile,
  postChangePassword,
  getSettings,
};
