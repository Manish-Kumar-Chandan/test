const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const {sequelize} = require("./sequelize/models");
require("dotenv").config();

const config = require("./config/config").get(process.env.NODE_ENV);

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(config.DATABASE, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     retryWrites: false,
//     useCreateIndex: true,
//   })
//   .then(console.log(`Mongo Connected`))
//   .catch((err) => {
//     throw err;
//   });

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// logger
if (process.env.NODE_ENV === "production") {
  app.use(
    morgan("common", {
      stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
        flags: "a",
      }),
    })
  );
}

//routes
app.use("/", require("./routes/user"));
app.use("/", require("./routes/post"));
app.use("/", require("./routes/comment"));
app.use("/api/attributes/", require("./routes/attributes"));
app.use("/api/add/", require("./routes/chickens"));

// Run server
const port = process.env.PORT || config.PORT;
app.listen(port, async() => {
  const timing = new Date();
  console.log(`App is listing on ${port} at: ${timing}`);
  await sequelize.authenticate();
  console.log("Sequelize Database Connected")
});
