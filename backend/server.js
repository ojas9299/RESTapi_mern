const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const User = require("./schema.js");

mongoose.connect("mongodb://127.0.0.1:27017/mern");

//basic middlewares
app.use(cors());
app.use(express.json());
// app.get("/api/message", (req, res) => {
//   res.json({ users: ["Userone", "Usertwo", "Userthree"] });
// });

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.status(200).send(newuser);
    console.log(newuser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    console.log(user);
    if (!user) {
      res.status(500).send({ message: "user not found!" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let newData = req.body;
    let updatedUser = await User.findByIdAndUpdate(id, newData, { new: true });

    if (!updatedUser) {
      res.status(500).send({ message: "user not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    console.log("user deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log("server working on port 5000");
});
