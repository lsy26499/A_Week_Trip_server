import express from 'express';
import passport from 'passport';

//import google from '../controller/userController/googleLogin';
import logout from '../controller/userController/logout';
import facebook from '../controller/userController/FBLogin';
import myPosts from '../controller/userController/myPosts';
import scrap from '../controller/userController/scrap';
import scrapList from '../controller/userController/scrapList';
import {
    favStations,
    favStationsList,
} from '../controller/userController/favoriteStation';
import authService from '../controller/userController/google/services/AuthService';

const userRouter = express.Router();

userRouter.post('/facebook', facebook);
// userRouter.post('/naver', naver);
userRouter.post('/logout', logout);
userRouter.put('/scrap/:userId/:communityId', scrap);
userRouter.get('/myPosts/:id', myPosts);
userRouter.get('/scrap/:id', scrapList);
userRouter.put('/favStation/:userId/:stationId', favStations);
userRouter.get('/favStationList/:id', favStationsList);

//TODO: userId 구현이 되면 params로 받던 id를 정리하고 진짜 userId 데이터로 리팩토링을 해 주세요.

userRouter.get(
    '/google',
    passport.authenticate('google', {
        session: false,
        scope: ['profile', 'email'],
        accessType: 'offline',
        approvalPrompt: 'force',
    })
);

userRouter.get(
    '/google/callback/',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        authService.signToken(req, res);
    }
);

userRouter.get('/verify', authService.checkTokenMW, (req, res) => {
    authService.verifyToken(req, res);
    if (null === req.authData) {
        res.sendStatus(403);
    } else {
        res.json(req.authData);
    }
});

export default userRouter;
