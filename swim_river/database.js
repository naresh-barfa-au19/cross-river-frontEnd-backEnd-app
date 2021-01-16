const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/swim_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", function () {
  console.log("Connection Successful!");
});

const Schema = mongoose.Schema;

const RiverSchema = new Schema({
  RiverVelocity: {
    type: Number,
    required: true,
  },
  PersonVelocity: {
    type: Number,
    required: true,
  },
  RiverWidth: {
    type: Number,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
});

const RiverModel = mongoose.model("RiverModel", RiverSchema);

module.exports = { RiverModel, db };
