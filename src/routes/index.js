const authRouter = require('./authRouter');
const equipmentRouter = require('./equipmentRouter');
const userRouter = require('./userRouter');
const apiRouter = require('./apiRouter');
const homeController = require('../controllers/homeController');
const { notFound, globalError } = require('../middleware/errorHandler');

function setupRoutes(app) {
  app.get('/', homeController.index);
  app.use('/auth', authRouter);
  app.use('/equipment', equipmentRouter);
  app.use('/users', userRouter);
  app.use('/api', apiRouter);

  app.use(notFound);
  app.use(globalError);
}

module.exports = setupRoutes;
