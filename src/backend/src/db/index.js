const mongoose = require('mongoose');

const { DB_CONNECT_PATH } = require('src/config');
const { infoLogger } = require('src/helpers/Logger');

function connectDB(dbPath = DB_CONNECT_PATH) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      dbPath,
      { useNewUrlParser: true }
    );
    const db = mongoose.connection;
    db.on('error', () => {
      reject(new Error(`DB connection error: ${dbPath}`));
    });
    db.once('open', function() {
      infoLogger(`Connection to '${dbPath}' successfully opened`);
      resolve();
    });
  });
}

module.exports = {
  connectDB,
};
