const { loginSchema } = require('../helpers/validation');
const authService = require('../services/authService');

function getLogin(req, res) {
  if (req.cookies.token) {
    return res.redirect('/equipment');
  }
  res.render('auth/login', { title: 'Đăng nhập', error: null });
}

async function postLogin(req, res) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.render('auth/login', { title: 'Đăng nhập', error: error.details[0].message });
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
    res.render('auth/login', { title: 'Đăng nhập', error: err.message });
  }
}

function logout(_req, res) {
  res.clearCookie('token');
  res.redirect('/auth/login');
}

module.exports = { getLogin, postLogin, logout };
