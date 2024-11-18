import { Router } from "express";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser,
    loginUser,
    logoutUser,
    refreshToken,
} from "../controllers/user.controllers.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users/register", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);
router.post("/users/refresh-token", refreshToken);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
