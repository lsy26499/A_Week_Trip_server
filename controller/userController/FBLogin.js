import User from '../../model/user';
import jwt from 'jsonwebtoken';
import request from 'request';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const fbToken = (token) => {
    return new Promise((resolve) => {
        request(
            `https://graph.facebook.com/me?access_token=${token}`,
            async (err, response, body) => {
                if (err) console.log(err);
                else {
                    const obj = await JSON.parse(body);
                    resolve(obj);
                }
            }
        );
    });
};

const facebook = async (req, res) => {
    const { fbAccessToken } = req.body;

    const userInfo = await fbToken(fbAccessToken);
    const { name, id } = userInfo;

    const findConditionfbUserId = {
        userId: id,
        name: name,
    };

    await User.findOne(findConditionfbUserId).exec((err, user) => {
        if (err) {
            res.json({
                type: false,
                data: 'Error occured' + err,
            });
        } else if (!user) {
            console.log('유저를 찾을 수 없습니다.');
            fbSignup(id, name, fbAccessToken, (err, savedUser) => {
                console.log(1);
                if (err) {
                    res.json({
                        type: false,
                        data: 'Error occured' + err,
                    });
                } else {
                    res.status(201).json({
                        type: true,
                        name: savedUser.name,
                        userId: savedUser.userId,
                        token: savedUser.jsonWebToken,
                    });
                }
            });
        } else if (user) {
            user.fbToken = fbAccessToken;
            user.jsonWebToken = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            });
            user.save((err, savedUser) => {
                res.status(201).json({
                    type: true,
                    userId: user.userId,
                    name: user.name,
                    token: user.jsonWebToken,
                });
            });
        }
    });
};

const fbSignup = (id, name, fbAccessToken, next) => {
    const userModel = new User();
    userModel.userId = id;
    userModel.name = name;
    userModel.fbToken = fbAccessToken;
    console.log(userModel);
    console.log('---------');
    userModel.save((err, user) => {
        console.log(user);
        user.jsonWebToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        user.save((err, savedUser) => {
            next(err, savedUser);
        });
    });
};

module.exports = facebook;
