import app from './app';
import env from './config/env';
import logger from './config/logger';

const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      logger.info(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer(); 