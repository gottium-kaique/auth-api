import { Router } from "express"
import UsersController from "@controllers/UsersController"
import AuthController from "@controllers/AuthController"
import authMiddleware from "@middlewares/authMiddleware"

const routes = Router()

routes.post("/users", UsersController.create)
routes.delete("/users", UsersController.delete)
routes.get("/users/:email", UsersController.index)
routes.put("/users", UsersController.update)

routes.post("/auth", AuthController.authenticate)
routes.get("/user-id", authMiddleware, UsersController.indexUserId)

export default routes