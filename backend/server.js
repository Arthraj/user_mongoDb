require("./db/conn");
const cors = require("cors");
const User = require("./models/user");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/user", async (req, res) => {
  try {
    // console.log(req.body);
    const addingRecord = new User(req.body);
    const insertMens = await addingRecord.save();
    res.status(201).send(insertMens);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/user", async (req, res) => {
  try {
    const getUsers = await User.find({});
    res.send(getUsers);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const _id=req.params.id;
    const getSingleUser = await User.findById(_id);
    res.send(getSingleUser);
  } catch (e) {
    res.status(400).send(e);
  }
});


app.listen(port, () => {
  // console.log(`Connection setup done at port no. ${port}`);
});
