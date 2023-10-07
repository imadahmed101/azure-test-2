// const express = require('express')
// const app = express()
// const PORT = process.env.PORT || 80

// app.use(cors())
// app.use(express.json())
// const cors = require('cors')

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 80;
const path = require('path')

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

//db schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

//db model
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const username = req.body.username
  const password = req.body.password
  try {
    res.json({username, password})
  } catch (error) {
    res.status(401).json(message = "Login details incorrect")
  }

  //save to mongodb and send response
  // const newUser = new User({
  //   username: req.body.username,
  //   password: req.body.password,
  // });

  // newUser
  //   .save()
  //   .then((user) => res.json(user))
  //   .catch((err) => console.log(err));
});

app.use(express.static("./client/build"))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});