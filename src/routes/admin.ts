
import { Router } from "express";
const router = Router();

import HomeController from "../controllers/HomeController";
router.get('/', HomeController.index);
router.get('/department', HomeController.department);
router.get('/position', HomeController.position);
router.get('/employee', HomeController.employee);

export default router;