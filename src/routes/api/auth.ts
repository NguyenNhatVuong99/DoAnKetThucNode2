import { Router, Request, Response } from "express";
const router = Router();
import AuthController from '../../controllers/api/AuthController';
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/update-password", AuthController.updatePassword);

export default router;
