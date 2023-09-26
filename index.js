const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
// const userRouter = require("./Routes/user.route");
const userRouter = require("./Routes/user.router");
const cors = require("cors");
const mongoose = require("mongoose");
let URI =
  "mongodb+srv://olayiwola2288:Tunde2288@cluster0.vyyzgvp.mongodb.net/myfirst_db?retryWrites=true&w=majority";
mongoose
  .connect(URI)
  .then(() => {
    console.log("welcome to database");
  })
  .catch((err) => {
    console.log(err, "your database is not connected");
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.listen(PORT, () => {
  console.log("sever run on " + PORT);
});
