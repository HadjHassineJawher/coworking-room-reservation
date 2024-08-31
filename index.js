const { exec } = require('child_process');
const app = require('./src/index');
const config = require('./src/config/env.config');
const connectDB = require('./src/config/database.config');
const { connectRedis } = require('./src/config/redisDatabase.config'); // Import the Redis connection function

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis(); 

    const server = app.listen(config.port, () => {
      console.log(
        `Server is running in ${config.nodeEnv} mode on port ${config.port}`,
      );

      if (config.nodeEnv !== 'development') {
        exec(`start http://localhost:${config.port}`);
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
