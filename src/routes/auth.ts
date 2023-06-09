
import { Router } from "express";
const router = Router();
import passport from '../config/passport';
import { loginMiddleware } from "../middlewares/authenticateJWT";
import HomeController from "../controllers/HomeController";
import AuthController from "../controllers/api/AuthController";
router.get('/', HomeController.index);
router.get('/login',loginMiddleware, HomeController.login);
router.get('/forgot-password',loginMiddleware, HomeController.forgotPassword);
router.get('/update-password',loginMiddleware, HomeController.updatePassword);
router.get('/verify', loginMiddleware,AuthController.verifyLink);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', AuthController.googleCallback);
export default router;