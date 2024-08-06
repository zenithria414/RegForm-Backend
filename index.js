const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env);

const app = express();
const port = process.env.PORT || 3000;

main()
  .then(() => {
    console.log("connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/RegForm");
}

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", FormSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Registration.findById({ _id: id });
    const registrationdata = new Registration({
      name,
      email,
      password,
    });
    await registrationdata.save().then((res) => {
      console.log(res);
    });
    res.sendFile(__dirname + "/pages/success.html");
  } catch (err) {
    console.log(err);
    res.sendFile(__dirname + "/pages/error.html");
  }
});
