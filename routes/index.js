const express = require("express");
const router = express.Router();
// Define all route mappings here
const routeModules = [
  //   { path: "/common", module: require("./common.route") },
    { path: "/users", module: require("./users/users.route") },
];

// register routes
routeModules.forEach(({ path, module }) => {
  router.use(path, module);
});

module.exports = router;
