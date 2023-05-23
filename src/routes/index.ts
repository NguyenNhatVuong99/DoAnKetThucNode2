import { Router, Request, Response } from "express";
import apiRoute from "./api"
import userRoute from "./user"
const router = Router();
const defaultRoutes = [
    {
        path: "/api/v1",
        route: apiRoute,
    },
    {
        path: "/",
        route: userRoute,
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router;