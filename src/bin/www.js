const http = require('node:http');
const mongoose = require('mongoose');
const app = require('../index');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

function gracefulShutdown(signal) {
  console.log(`\n${signal} received – shutting down gracefully…`);
  server.close(async () => {
    await mongoose.disconnect();
    console.log('🔌 MongoDB disconnected');
    process.exit(0);
  });
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
