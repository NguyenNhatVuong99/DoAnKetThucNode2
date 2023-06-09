import { Request, Response } from 'express';
import { Op } from 'sequelize'
import bcrypt from 'bcryptjs';
import User from '../../models/user';
import UserValidator from '../../validations/auth';
import redisClient from '../../config/RedisClient';
import { generateToken, verifyToken } from '../../utils/jwtUtils';
import passport from '../../config/passport';
import generateVerificationToken from "../../utils/token";
import generateUrl from "../../utils/url";
import redis from "ioredis"
import path from 'path';
import mailer from "../../utils/mailer";
import ejs from 'ejs';
import jwt, { JwtPayload } from 'jsonwebtoken';

class AuthController {
    async login(req: Request, res: Response) {
        const { error } = UserValidator(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        let { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { email }
            });
            // console.log(user)
            if (user) {
                const userData = user.toJSON();
                const isPasswordValid = await bcrypt.compare(password, userData.password);
                if (isPasswordValid) {
                    // console.log(userData.id)
                    const token = generateToken(userData.id, '360000');
                    // console.log(token);
                    //     //         // Store JWT token in Redis
                    await redisClient.set(userData.id.toString(), token);
                    res.cookie('access_token', token, {
                        maxAge: 365 * 24 * 60 * 60 * 100,
                        httpOnly: true,
                        //secure: true;
                    })
                    return res.status(200).json(
                        {
                            message: "Đăng nhập thành công"
                        }
                    );
                } else {
                    res.status(400).json({ message: "Vui lòng nhập lại" });
                }
            } else {
                res.status(400).json({ message: "Vui lòng nhập lại" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
    async logout(req: Request, res: Response) {
        res.clearCookie("access_token");
        // // Xóa dữ liệu người dùng trong res.locals
        // res.locals.currentUser = null;
        res.status(200).json({ message: "Đăng xuất thành công" });

    }
    async githubCallback(req: Request, res: Response) {
        passport.authenticate('github',
            { failureRedirect: '/login' }
        ), (err: any, user: any, info: any) => {
            // Access the authenticated user object (req.user)
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!user) {
                return res.status(401).json({ message: info.message });
            }
            return res.redirect('/admin');
        }
    }
    async googleCallback(req: Request, res: Response) {
        passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
            if (err) {
                // Xử lý lỗi xác thực
                console.error('Authentication error:', err);
                return res.redirect('/login');
            }
            const token = generateToken(user.id, '360000');
            // console.log(token);
            //     //         // Store JWT token in Redis
            redisClient.set(user.toJSON().id.toString(), token);
            res.cookie('access_token', token, {
                maxAge: 365 * 24 * 60 * 60 * 100,
                httpOnly: true,
                //secure: true;
            })
            res.redirect('/admin')
        })(req, res);
    }
    async forgotPassword(req: Request, res: Response) {
        let { email, password } = req.body;
        try {
            const user = await User.findOne({
                where: { email }
            });
            if (user) {
                let userData = user.toJSON();
                let id = userData.id
                const token = generateToken(id, '360000');
                const { url } = generateUrl();
                const verifyUrl: string = `${url}/verify?token=${token}&userId=${id}`
                redisClient.set(user.toJSON().id.toString(), token);
                const dataEmail = {
                    fullName: userData.firstName + ' ' + userData.lastName,
                    verifyUrl: verifyUrl
                }
                const templatePath = path.join(__dirname, '..', '..', 'views', 'verify-email-template.ejs');
                try {
                    const fileData = await ejs.renderFile(templatePath, dataEmail);
                    const subject: string = 'Verify your email address';
                    mailer.sendMail(userData.email, subject, fileData);

                    res.status(200).json({ message: "Verification email has been sent." });

                } catch (err: any) {
                    res.status(500).json({ message: err.message });
                }
            } else {
                res.status(400).json({ message: "Vui lòng nhập lại" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Lỗi server" });
        }
    }
    async verifyLink(req: Request, res: Response) {
        const { token, userId } = req.query;
        try {
            const decodedToken = verifyToken(token as string) as JwtPayload;
            const user = await User.findByPk(userId as string, {
                attributes: ['email']
            });
            if (user) {
                const email = user.toJSON()
                res.render("pages/update-password", {data:email})
            } else {
                res.redirect("/forgot-password")
            }
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                res.redirect("/forgot-password")
            }
        }
    }
    async updatePassword(req: Request, res: Response) {

    }
}
export default new AuthController();