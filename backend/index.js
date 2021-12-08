const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

const user = require("./routes/userRoutes");
const message = require("./routes/messageRoutes");
const group = require("./routes/groupRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config({ path: "backend/config/config.env" });

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/user", user);
app.use("/api/message", message);
app.use("/api/group", group);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Listening on Port ${process.env.PORT}`)
);
