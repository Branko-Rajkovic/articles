const dotenv = require('dotenv');
const app = require('./app');
const dbConnect = require('./dbConnect');

dotenv.config({ path: './config.env' });

const connectionString = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

dbConnect(connectionString);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
