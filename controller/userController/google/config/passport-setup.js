import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../../../../model/user';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            callbackURL: 'http://localhost:5050/user/google/callback',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            console.log(profile);
            const currentUser = await User.findOne({ userId: profile.id });
            if (currentUser) {
                return done(null, currentUser);
            } else {
                const newUser = await new User({
                    googleEmail: email,
                    userId: profile.id,
                    name: profile.displayName,
                }).save();
                console.log(newUser);
                return done(null, newUser);
            }
        }
    )
);
