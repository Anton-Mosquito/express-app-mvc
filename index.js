const express = require("express");
const bodyParser = require("body-parser");
const inject = require("require-all");
const mongoose = require("mongoose");

const app = express();
const router = express.Router;
const port = 5000;
const DB_URL = `mongodb+srv://user:123@cluster0.nm6ws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

try {
  const controllers = inject(__dirname + "/controllers");
  const actions = inject(__dirname + "/actions");
  const models = inject(__dirname + "/models");

  mongoose.connect(DB_URL, { useNewUrlParser: true });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.info("Database connected!");
  });

  for (const key in controllers) {
    if (Object.hasOwnProperty.call(controllers, key)) {
      app.use(`/${key}`, controllers[key]({ router, actions, models }));
    }
  }
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log(`Server work on port ${port}`));
