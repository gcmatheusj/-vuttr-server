const routes = require("express").Router();

const authMiddleware = require("./app/middleware/auth");

const SessionController = require("./app/controllers/SessionController");
const UserController = require("./app/controllers/UserController");
const ToolController = require("./app/controllers/ToolController");

routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

routes.use(authMiddleware);

routes.post("/tools", ToolController.store);
routes.get("/tools", ToolController.index);
routes.put("/tools/:id", ToolController.update);
routes.delete("/tools/:id", ToolController.destroy);

routes.get("/dashboard", (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
