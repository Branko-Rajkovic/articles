const mongoose = require('mongoose');

const dbConnect = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to Mongodb Atlas');
  } catch (error) {
    console.error(error);
  }
};
module.exports = dbConnect;
