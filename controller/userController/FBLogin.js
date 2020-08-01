import User from '../../model/user';
import jwt from 'jsonwebtoken';
import { request } from 'express';

const jwtSecret = 'secret'; //env 파일에 업로드할 것

/**
 * 플로우를 세워 보자. 현재 엑스포를 이용해서 엑세스 토큰을 받아 왔다.
 * 리다이렉트를 통한 로그인 구현을 해야 한다.
 * 리퀘스트를 이용해서 토큰 확인을 한 후에 요것을 받아올 수가 있나? 어떠한 것을..
 * 클라이언트에서 받는 것은 액세스 토큰밖에 없을 텐데......
 * 액세스 토큰을 리다이렉트했을 때, 만료가 되거나 하면 페이스북에서 재발급을 해 주려나.
 *
 */

const fbToken = (token) => {
    return new Promise((resolve) => {
        request(
            `https://graph.facebook.com/me?access_token=${token}`,
            function (err, response, body) {
                if (err) console.log(err);
                else {
                    resolve(response.json());
                    //토큰 받는 것을 성공하면 그 값을 보내야 되잖아... 그렇지...
                    //그런데 여기서는 response라고 했으니까
                    //let userInfo = await JSON.parse(body);
                }
            }
        );
    });
};

//! async await 작업
const facebook = (req, res) => {
    const { fbAccessToken, name } = req.body;
    const userInfo = fbToken(fbAccessToken).then((result) => result);
    //async로 바꿀 수 있을까? 만약에 이게 된다면 리팩토링 좀 해 보자
    const { email } = userInfo;
    console.log(email);

    // const fbUserEmail = req.body.fbUserEmail;
    // const fbAccessToken = req.body.fbAccessToken;
    const findConditionfbUserEmail = {
        email: email,
        name: name,
    };

    User.findOne(findConditionfbUserEmail).exec((err, user) => {
        if (err) {
            res.json({
                type: false,
                data: 'Error occured' + err,
            });
        } else if (!user) {
            console.log('유저를 찾을 수 없습니다.');
            fbSignup(email, fbAccessToken, (err, savedUser) => {
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

const fbSignup = (email, fbAccessToken, next) => {
    const userModel = new User();
    userModel.email = email;
    userModel.name = name;
    userModel.fbToken = fbAccessToken;
    userModel.save((err, newUser) => {
        newUser.jsonWebToken = jwt.sign(newUser, jwtSecret);
        newUser.save((err, savedUser) => {
            next(err, savedUser);
        });
    });
};

module.exports = facebook;
