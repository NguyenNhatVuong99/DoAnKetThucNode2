import { Router } from "express";
// import userRoute from "./api/user"
import authRoute from "./api/auth"
// import employeeRoute from "./api/employee"
// import departmentRoute from "./api/department"
// import authRoute from "./api/auth"
const router = Router();
const defaultRoutes = [
    {
        path: "/auth",
        route: authRoute
    }
]
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router;