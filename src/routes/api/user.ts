import { Router, Request, Response } from "express";
const router = Router();
import UserController from '../../controllers/api/UserController';
const controller = UserController
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/", controller.store);
router.get("/:id", controller.show);
router.get("/:id/edit", controller.edit);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);
// router.get("/destroyAll", controller.destroyAll);
export default router;
