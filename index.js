const express = require("express");
const inject = require("require-all");

const app = express();
const router = express.Router;
const port = 5000;

//app.get();
try {
  const controllers = inject(__dirname + "/controllers");

  for (const key in controllers) {
    if (Object.hasOwnProperty.call(controllers, key)) {
      app.use(`/${key}`, controllers[key](router));
    }
  }
} catch (error) {
  console.log(error);
}

app.listen(port, () => console.log(`Server work on port ${port}`));
