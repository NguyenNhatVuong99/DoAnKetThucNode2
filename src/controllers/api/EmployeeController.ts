import { Request, Response } from 'express';
import { Sequelize, Op } from 'sequelize'
import Employee from '../../models/Employee'
class EmployeeController {

    //643a71ce5fefda1534127c81
    async index(req: Request, res: Response) {
        try {

            res.status(200).json({
            })
        } catch (error) {
            res.status(500).json({
                "message": error
            })
        }
    }
    async show(req: Request, res: Response) {
        let id = req.params.id;
        try {
            let data = await Employee.findByPk(id);
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                "message": error
            })
        }
    }
    async create(req: Request, res: Response) {
    }
    async store(req: Request, res: Response) {
    }
    async edit(req: Request, res: Response) {
    }
    async update(req: Request, res: Response) {

    }
    async destroy(req: Request, res: Response) {

    }
}
export default new EmployeeController();