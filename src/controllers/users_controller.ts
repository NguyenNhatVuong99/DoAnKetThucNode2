import { Response, Request } from "express";
import User from "../models/user";

class UserController {
    async index(req:Request, res:Response){
        try {
            const users = await User.findAll();
            res.status(200).json({users});
        } catch (error) {
            res.status(500).json({message: "Err!!!!"});
        }
        
    }

    async show(req:Request, res:Response){
        try {
            const user = await User.findByPk(1)
            res.status(200).json({user:"anc"});
        } catch (error) {
            res.status(500).json({message: "Err!!!!"});
        }

    }

    async create(req:Request, res:Response){
        let {name, email} = req.body;
        try {
            const user = await User.create({name, email})
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({message: "Err!!!!"});
        }
    }

    // update(req:Request, res:Response){

    // }

    // delete(req:Request, res:Response){

    // }

    
}

export default new UserController();