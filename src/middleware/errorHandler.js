function notFound(req, res) {
  res.status(404).render('error', {
    title: '404 – Không tìm thấy',
    message: `Trang "${req.path}" không tồn tại.`,
  });
}

// 4-argument signature required by Express to detect as error middleware
// biome-ignore lint/correctness/noUnusedVariables: required Express signature
function globalError(err, req, res, next) {
  console.error(err.stack || err);
  const status = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Đã xảy ra lỗi máy chủ, vui lòng thử lại sau.' : err.message;
  res.status(status).render('error', { title: 'Lỗi máy chủ', message });
}

module.exports = { notFound, globalError };
