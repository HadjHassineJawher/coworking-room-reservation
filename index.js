const { exec } = require('child_process');
const app = require('./src/index');
const config = require('./src/config/env.config');
const connectDB = require('./src/config/database.config');
const { connectRedis } = require('./src/config/redisDatabase.config'); 

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis(); 

    const server = app.listen(config.PORT, () => {
      console.log(
        `Server is running in ${config.NODE_ENV} mode on port ${config.PORT}`,
      );

      if (config.NODE_ENV !== 'development') {
        exec(`start http://localhost:${config.PORT}`);
      }
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received. Closing server...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received. Closing server...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
