const { Router } = require("express");
const UsersController = require("../controllers/UsersController")

const userController = new UsersController()

const usersRouter = Router();

usersRouter.post("/", userController.create);

module.exports = usersRouter