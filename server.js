//load env
const envs = require("./config/env");
const db = require("./models");

const app = require("./app");

// Sync DB
db.sequelize
  .sync()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("🚀 ~ DB connected.");
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log("🚀 ~ DB connection Error:", error);
  });

app.listen(envs.port, () => {
  console.log("I am here");
  // eslint-disable-next-line no-console
  console.log("🚀 ~ App is running at ~ ", `http://127.0.0.1:${envs.port}`);
});
