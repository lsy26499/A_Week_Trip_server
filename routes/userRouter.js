import express from 'express';

import google from '../controller/userController/googleLogin';
import kakao from '../controller/userController/kakaoLogin';
import logout from '../controller/userController/logout';
import naver from '../controller/userController/naverLogin';
import myPosts from '../controller/userController/myPosts';
import scrap from '../controller/userController/scrap';
import scrapList from '../controller/userController/scrapList';
import {
    favStations,
    favStationsList,
} from '../controller/userController/favoriteStation';

const userRouter = express.Router();

// userRouter.post('/google', google);
// userRouter.post('/kakao', kakao);
// userRouter.post('/naver', naver);
// userRouter.post('/logout', logout);
userRouter.put('/scrap/:userId/:communityId', scrap);
userRouter.get('/myPosts/:id', myPosts);
userRouter.get('/scrap/:id', scrapList);
userRouter.put('/favStation/:userId/:stationId', favStations);
userRouter.get('/favStationList/:id', favStationsList);

//TODO: userId 구현이 되면 params로 받던 id를 정리하고 진짜 userId 데이터로 리팩토링을 해 주세요.

export default userRouter;
