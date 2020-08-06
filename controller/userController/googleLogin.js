import User from '../../model/user';
import jwt from 'jsonwebtoken';
import request from 'request';
import dotenv from 'dotenv';
dotenv.config();

const googleToken = (token) => {
    console.log(token);
    return new Promise((resolve) => {
        request(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
            function (err, response, body) {
                if (err) console.log(err);
                else {
                    const obj = JSON.parse(body);
                    resolve(obj);
                }
            }
        );
    });
};

//! async await 작업
const googleLogin = async (req, res) => {
    const { google, googleName } = req.body;
    const userInfo = await googleToken(google);

    const { user_id } = userInfo;

    const findConditionfbUserId = {
        userId: user_id,
        name: googleName,
    };

    User.findOne(findConditionfbUserId).exec((err, user) => {
        if (err) {
            res.json({
                type: false,
                data: 'Error occured' + err,
            });
        } else if (!user) {
            console.log('유저를 찾을 수 없습니다.');
            googleSignup(user_id, googleName, (err, savedUser) => {
                if (err) {
                    res.json({
                        type: false,
                        data: 'Error occured' + err,
                    });
                } else {
                    res.status(201).json({
                        type: true,
                        name: savedUser.googleName,
                        userId: savedUser.user_Id,
                        token: savedUser.jsonWebToken,
                    });
                }
            });
        } else if (user) {
            user.jsonWebToken = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });
            user.save((err, savedUser) => {
                res.status(201).json({
                    type: true,
                    userId: savedUser.user_Id,
                    name: savedUser.googleName,
                    token: savedUser.jsonWebToken,
                });
            });
        }
    });
};

const googleSignup = (user_id, googleName, next) => {
    const userModel = new User();
    userModel.userId = user_id;
    userModel.name = googleName;

    userModel.save((err, user) => {
        userModel.jsonWebToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        userModel.save((err, savedUser) => {
            next(err, savedUser);
        });
    });
};

module.exports = googleLogin;
