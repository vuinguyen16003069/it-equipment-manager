const {
  loginSchema,
  registerSchema,
  verifyOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../helpers/validation');
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
    await authService.register(value.username, value.email, value.password);
    res.render('auth/verify-otp', {
      title: 'Xác thực mã OTP',
      email: value.email,
      error: null,
      success: `Mã OTP đã được gửi đến ${value.email}. Vui lòng kiểm tra email của bạn.`,
    });
  } catch (err) {
    res.render('auth/register', { title: 'Đăng ký', error: err.message, success: null });
  }
}

function getVerifyOtp(req, res) {
  const { email } = req.query;
  res.render('auth/verify-otp', { title: 'Xác thực mã OTP', email: email || '', error: null, success: null });
}

async function postVerifyOtp(req, res) {
  const { error, value } = verifyOtpSchema.validate(req.body);
  if (error) {
    return res.render('auth/verify-otp', {
      title: 'Xác thực mã OTP',
      email: req.body.email,
      error: error.details[0].message,
      success: null,
    });
  }

  try {
    await authService.verifyOtp(value.email, value.otp);
    res.render('auth/login', {
      title: 'Đăng nhập',
      error: null,
      success: 'Xác thực tài khoản thành công! Bây giờ bạn có thể đăng nhập.',
    });
  } catch (err) {
    res.render('auth/verify-otp', { title: 'Xác thực mã OTP', email: value.email, error: err.message, success: null });
  }
}

function getForgotPassword(_req, res) {
  res.render('auth/forgot-password', { title: 'Quên mật khẩu', error: null, success: null });
}

async function postForgotPassword(req, res) {
  const { error, value } = forgotPasswordSchema.validate(req.body);
  if (error) {
    return res.render('auth/forgot-password', {
      title: 'Quên mật khẩu',
      error: error.details[0].message,
      success: null,
    });
  }

  try {
    await authService.forgotPassword(value.email);
    res.render('auth/reset-password', {
      title: 'Đặt lại mật khẩu',
      email: value.email,
      error: null,
      success: `Mã OTP đặt lại mật khẩu đã được gửi đến ${value.email}.`,
    });
  } catch (err) {
    res.render('auth/forgot-password', { title: 'Quên mật khẩu', error: err.message, success: null });
  }
}

function getResetPassword(req, res) {
  const { email } = req.query;
  res.render('auth/reset-password', { title: 'Đặt lại mật khẩu', email: email || '', error: null, success: null });
}

async function postResetPassword(req, res) {
  const { error, value } = resetPasswordSchema.validate(req.body);
  if (error) {
    return res.render('auth/reset-password', {
      title: 'Đặt lại mật khẩu',
      email: req.body.email,
      error: error.details[0].message,
      success: null,
    });
  }

  try {
    await authService.resetPassword(value.email, value.otp, value.password);
    res.render('auth/login', {
      title: 'Đăng nhập',
      error: null,
      success: 'Đặt lại mật khẩu thành công! Vui lòng đăng nhập với mật khẩu mới.',
    });
  } catch (err) {
    res.render('auth/reset-password', {
      title: 'Đặt lại mật khẩu',
      email: value.email,
      error: err.message,
      success: null,
    });
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
  getVerifyOtp,
  postVerifyOtp,
  getForgotPassword,
  postForgotPassword,
  getResetPassword,
  postResetPassword,
};
