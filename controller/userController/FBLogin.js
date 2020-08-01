import User from '../../model/user';
import jwt from 'jsonwebtoken';

const jwtSecret = 'secret'; //env 파일에 업로드할 것

const facebook = (req, res) => {
    const fbUserEmail = req.body.fbUserEmail;
    const fbAccessToken = req.body.fbAccessToken;

    const findConditionfbUserEmail = {
        email: fbUserEmail,
    };

    User.findOne(findConditionfbUserEmail).exec((err, user) => {
        if (err) {
            res.json({
                type: false,
                data: 'Error occured' + err,
            });
        } else if (!user) {
            console.log('유저를 찾을 수 없습니다.');
            fbSignup(fbUserEmail, fbAccessToken, (err, savedUser) => {
                console.log(1);
                if (err) {
                    res.json({
                        type: false,
                        data: 'Error occured' + err,
                    });
                } else {
                    res.json({
                        type: true,
                        data: savedUser,
                        token: savedUser.jsonWebToken,
                    });
                }
            });
        } else if (user) {
            console.log('user');
            console.log(user);
            user.fbToken = fbAccessToken;
            user.save((err, savedUser) => {
                res.json({
                    type: true,
                    data: user,
                    token: user.jsonWebToken,
                });
            });
        }
    });
};

const fbSignup = (fbUserEmail, fbAccessToken, next) => {
    const userModel = new User();
    userModel.email = fbUserEmail;
    userModel.fbToken = fbAccessToken;
    userModel.save((err, newUser) => {
        newUser.jsonWebToken = jwt.sign(newUser, jwtSecret);
        newUser.save((err, savedUser) => {
            next(err, savedUser);
        });
    });
};

module.exports = facebook;
