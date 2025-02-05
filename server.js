const dotenv = require('dotenv');
const app = require('./app');
const dbConnect = require('./dbConnect');

dotenv.config();

const connectionString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

dbConnect(connectionString);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! ... shuting down ...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! ...shuting down ...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
