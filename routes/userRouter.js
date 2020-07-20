import express from 'express';

import google from '../controller/userController/googleLogin';
import kakao from '../controller/userController/kakaoLogin';
import logout from '../controller/userController/logout';
import naver from '../controller/userController/naverLogin';

export const userRouter = express.Router();

userRouter.post('/google', google);

userRouter.post('/kakao', kakao);

userRouter.post('/naver', naver);

userRouter.post('/logout', logout);
