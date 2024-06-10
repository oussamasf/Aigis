import { Router } from "express";
import { userController } from "../controllers/UserController";
// import AuthMiddleware from "../middlewares/AuthMiddleware";

const router: Router = Router();

router.get("/", userController.getUsers.bind(userController));
router.post("/", userController.createUser.bind(userController));
router.get("/:email", userController.findUser.bind(userController));

export default router;
