import { Router } from "express";
import userRoute from "./api/user"
import employeeRoute from "./api/employee"
import departmentRoute from "./api/department"
// import authRoute from "./api/auth"
const router = Router();
const defaultRoutes = [
    {
        path: "/user",
        route: userRoute
    },
    {
        path: "/employee",
        route: userRoute
    },
    {
        path: "/department",
        route: userRoute
    },
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router;