const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { RiverModel } = require("./database");
const { db } = require("./database");
var cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(`<h1>welcome home <h1/>`);
});

app.post("/enterData", async (req, res) => {
  // calculations
  const angle_in_radious = Math.atan(
    req.body.RiverVelocity / req.body.PersonVelocity
  );
  const angle = angle_in_radious * (180 / Math.PI);

  const trejectryVelocity = req.body.PersonVelocity / Math.cos(angle);

  const trejectryDistance = req.body.RiverWidth / Math.cos(angle);

  const Time = trejectryDistance / trejectryVelocity;

  const data = new RiverModel({
    RiverVelocity: req.body.RiverVelocity,
    RiverWidth: req.body.RiverWidth,
    PersonVelocity: req.body.PersonVelocity,
    result: {
      angle,
      Time,
      trejectryDistance,
    },
  });

  await RiverModel.findOneAndDelete({});
  const newData = new RiverModel(data);
  const dataDoc = await newData.save();
  res.send(dataDoc);
  console.log("Document inserted succussfully!");
});

app.get("/enterData", async (req, res) => {
  const getData = await RiverModel.findOne({});
  const angle_in_radious = Math.atan(
    getData.RiverVelocity / getData.PersonVelocity
  );
  const angle = angle_in_radious * (180 / Math.PI);

  const trejectryVelocity = getData.PersonVelocity / Math.cos(angle);

  const trejectryDistance = getData.RiverWidth / Math.cos(angle);

  const Time = trejectryDistance / trejectryVelocity;
  // console.log("angle_in_radious", angle_in_radious);
  // console.log(angle);
  // console.log(trejectryVelocity);
  // console.log(trejectryDistance);
  // console.log(Time);

  res.status(200).send({
    getData,
    trejectory_angle: angle,
    taken_time: Time,
  });
  // console.log(getData);
});

app.listen(4000, () => {
  console.log("server connected on port 4000 ");
});
