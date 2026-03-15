const jwt = require('jsonwebtoken');

/** Xác thực JWT từ cookie, trả về payload hoặc null nếu không hợp lệ */
function verifyToken(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.redirect('/auth/login');
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.clearCookie('token');
    res.redirect('/auth/login');
    return null;
  }
}

function requireAuth(req, res, next) {
  const user = verifyToken(req, res);
  if (!user) {
    return;
  }
  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  const user = verifyToken(req, res);
  if (!user) {
    return;
  }
  if (user.role !== 'admin') {
    return res.status(403).render('error', {
      title: 'Từ chối truy cập',
      message: 'Bạn không có quyền thực hiện thao tác này.',
    });
  }
  req.user = user;
  next();
}

module.exports = { requireAuth, requireAdmin };
