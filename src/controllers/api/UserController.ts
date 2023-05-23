import { Request, Response } from 'express';
import { Sequelize, Op } from 'sequelize'
import User from '../../models/User'
class UserController {

    //643a71ce5fefda1534127c81
    async index(req: Request, res: Response) {
        try {
            // let data = await User.findAll({
            // });
            let data = await User.findAll({
                where:{
                    [Op.and]:{
                        lastName : ["Nguyễn","Trịnh"],
                    }
                }
            });
            // let data = await User.findAll({
            //     attributes:['id'],
            //     where: {
            //         email: {
            //             [Op.notIn]: ['nhatvuong99@gmail.com']
            //         }
            //     }
            // });
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                "message": error
            })
        }
    }
    async show(req: Request, res: Response) {
        // const User = new UserModel();
        let id = req.params.id;
        try {
            let data = await User.findByPk(id);
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
    async destroyAll(req: Request, res: Response) {

    }

}
export default new UserController();