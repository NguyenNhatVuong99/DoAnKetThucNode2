import passport from 'passport';
import User from "../models/user"
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: '39030339976-3mptq2s4hsorhsvn3s9o5vmisrr63p7k.apps.googleusercontent.com',
            clientSecret: 'MgWBo6vg6cNr5EVY_npxJvuz',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['profile', 'email'],
        },
        async (accessToken: string, refreshToken: string, profile: Profile, cb) => {
            try {
                if (profile.emails && profile.emails.length > 0) {
                    const email = profile.emails[0].value;
                    // Register user here.
                    const userData = await User.findOne({ where: { email } });

                    if (userData) {
                        // Nếu người dùng đã tồn tại, trả về người dùng
                        cb(null, userData);
                    } else {
                        // Nếu người dùng chưa tồn tại, tạo mới và lưu vào cơ sở dữ liệu
                        const newUser = await User.create({
                            firstName: profile.name ? profile.name.familyName : "",
                            lastName: profile.name ? profile.name.givenName : "",
                            email: email,
                            avatarUrl: profile.photos ? profile.photos[0].value : "",
                            provider: profile.provider,
                            provider_id: profile.id
                        });

                        cb(null, newUser);
                    }
                }

            } catch (error: any) {
                console.error('Error finding or creating user:', error);
                cb(error);
            }
        })
);

export default passport;
