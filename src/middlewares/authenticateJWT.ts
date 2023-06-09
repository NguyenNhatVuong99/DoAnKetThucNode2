import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user';
import { verifyToken, generateToken } from '../utils/jwtUtils';

export const authenticateJWT: RequestHandler = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.redirect("/login");

    try {
        const decodedToken = verifyToken(token) as JwtPayload;
        const user = await User.findByPk(decodedToken.userId);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        res.locals.currentUser = user.toJSON();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            const refreshToken = req.cookies.refresh_token;
            if (refreshToken) {
                try {
                    const decodedRefreshToken = verifyToken(refreshToken) as JwtPayload;
                    const user = await User.findByPk(decodedRefreshToken.userId);

                    if (user) {
                        const userData = user.toJSON();
                        const newAccessToken = generateToken(userData.id, '3600');
                        res.cookie("access_token", newAccessToken, { httpOnly: true });
                        res.locals.currentUser = userData;
                    }
                } catch (error: any) {
                    console.error("Error refreshing token:", error);
                }
            }
        }
    }

    next();
};

export const adminMiddleware: RequestHandler = (req, res, next) => {
    if (req.cookies.access_token) return next();
    res.redirect("/login");
};

export const loginMiddleware: RequestHandler = (req, res, next) => {
    if (req.cookies.access_token) return res.redirect("/admin");
    next();
};

export const jwtMiddleware: RequestHandler = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decodedToken = verifyToken(token) as JwtPayload;
        const user = await User.findByPk(decodedToken.userId);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        res.locals.currentUser = user.toJSON();
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            console.error("Error verifying token:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
