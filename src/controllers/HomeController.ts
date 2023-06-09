import { Request, Response } from 'express';

class HomeController {
    async index(req: Request, res: Response) {
        res.render('pages/index')
    }
    async department(req: Request, res: Response) {
        res.render('pages/department')
    }
    async position(req: Request, res: Response) {
        res.render('pages/position')
    }
    async employee(req: Request, res: Response) {
        res.render('pages/employee')
    }
    async login(req: Request, res: Response) {
        res.render('pages/login')
    }
    async forgotPassword(req: Request, res: Response) {
        res.render('pages/forgot-password')
    }
    async updatePassword(req: Request, res: Response) {
        res.render('pages/update-password')
    }
}
export default new HomeController();