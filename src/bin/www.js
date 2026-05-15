const http = require('node:http');
const mongoose = require('mongoose');
const app = require('../index');

const CFonts = require('cfonts');
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  CFonts.say('IT MANAGER', {
    font: 'block',
    align: 'left',
    colors: ['system'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
    gradient: ['blue', 'cyan'],
    independentGradient: false,
    transitionGradient: false,
    env: 'node',
  });

  console.log('\x1b[36m%s\x1b[0m', `🚀 Server is flying at: http://localhost:${PORT}`);
  console.log('\x1b[90m%s\x1b[0m', '---------------------------------------------------');
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
