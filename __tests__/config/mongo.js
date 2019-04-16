const mongoose = require("mongoose");
const databaseConfig = require("../../src/config/database");

exports.connect = async () => {
  await mongoose.connect(databaseConfig.uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
};

exports.disconnect = async done => {
  await mongoose.disconnect(done);
};
