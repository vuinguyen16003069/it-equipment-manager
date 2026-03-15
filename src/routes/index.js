const authRouter = require('./authRouter');
const equipmentRouter = require('./equipmentRouter');
const { notFound, globalError } = require('../middleware/errorHandler');

function setupRoutes(app) {
  app.get('/', (_req, res) => res.redirect('/equipment'));
  app.use('/auth', authRouter);
  app.use('/equipment', equipmentRouter);

  // Error handlers – phải đặt cuối cùng
  app.use(notFound);
  app.use(globalError);
}

module.exports = setupRoutes;
