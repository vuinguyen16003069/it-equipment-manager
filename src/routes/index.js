const authRouter = require('./authRouter');
const equipmentRouter = require('./equipmentRouter');
const userRouter = require('./userRouter');
const apiRouter = require('./apiRouter');
const { notFound, globalError } = require('../middleware/errorHandler');

function setupRoutes(app) {
  app.get('/', (_req, res) => res.redirect('/equipment'));
  app.use('/auth', authRouter);
  app.use('/equipment', equipmentRouter);
  app.use('/users', userRouter);
  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(globalError);
}

module.exports = setupRoutes;
