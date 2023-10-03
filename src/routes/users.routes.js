const { Router } = require("express");
const UsersController = require("../controllers/UsersController")


const usersRouter = Router();








const userController = new UsersController()

usersRouter.post("/", userController.create);

module.exports = usersRouter