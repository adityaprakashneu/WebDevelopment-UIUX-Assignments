const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");
const app = express();
const bcrypt = require("bcrypt");
app.set("view engine", "ejs");


mongoose.connect("mongodb://127.0.0.1:27017/webd", {
  useNewUrlParser: true,
  
}).then(() => {
  console.log("Connected to database!");
}).catch((err) => { console.log(err) });

require("./routes/routes")(app);

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
