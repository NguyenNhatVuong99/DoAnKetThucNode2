import { Router, Request, Response } from "express";
import apiRoute from "./api"
import authRoute from "./auth"
import adminRoute from "./admin"
import { authenticateJWT, adminMiddleware, loginMiddleware } from "../middlewares/authenticateJWT"
const router = Router();
const defaultRoutes = [
    {
        path: "/api/v1",
        route: apiRoute,
        middleware: []
    },
    {
        path: "/admin",
        route: adminRoute,
        middleware:  [authenticateJWT, adminMiddleware]
    },
    {
        path: "/",
        route: authRoute,
        middleware: []

    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.middleware, route.route)
})
// defaultRoutes.forEach((route) => {
//     router.use(route.path, route.route)
// })


export default router;