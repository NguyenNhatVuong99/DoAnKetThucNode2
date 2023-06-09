import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

// Thiết lập Facebook strategy
passport.use(
    new FacebookStrategy(
        {
            clientID: '1263039471008451',
            clientSecret: '72a6ac3ce2082c92e4fd70f0d2d211b3',
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
        },
        async (_: any, __: any, profile: any, done: any) => {
            try {
                // Tìm hoặc tạo người dùng dựa trên Facebook ID
                const [user, created] = await User.findOrCreate({
                    where: { facebookId: profile.id },
                    defaults: {
                        email: profile.emails[0].value,
                    },
                });

                // Trả về thông tin người dùng
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Thiết lập Google strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: 'your-google-client-id',
            clientSecret: 'your-google-client-secret',
            callbackURL: 'your-google-callback-url',
        },
        async (_: any, __: any, profile: any, done: any) => {
            try {
                // Tìm hoặc tạo người dùng dựa trên Google ID
                const [user, created] = await User.findOrCreate({
                    where: { googleId: profile.id },
                    defaults: {
                        email: profile.emails[0].value,
                    },
                });

                // Trả về thông tin người dùng
                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// Khởi tạo Passport

passport.serializeUser<any, any>((user, done) => {
    done(null, user.id);
  });
  
passport.deserializeUser<any, any>(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

