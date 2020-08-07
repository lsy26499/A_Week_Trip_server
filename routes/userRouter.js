import express from 'express';

import google from '../controller/userController/googleLogin';
import logout from '../controller/userController/logout';
import facebook from '../controller/userController/FBLogin';
import myPosts from '../controller/userController/myPosts';
import scrap from '../controller/userController/scrap';
import scrapList from '../controller/userController/scrapList';
import {
    favStations,
    favStationsList,
} from '../controller/userController/favoriteStation';
import { checkedLogin } from '../middlewares';

const userRouter = express.Router();

userRouter.post('/facebook', facebook);
userRouter.post('/google', google);
userRouter.post('/logout', logout);
userRouter.put('/scrap/:communityId', checkedLogin, scrap);
userRouter.get('/myPosts', myPosts);
userRouter.get('/scrap', scrapList);
userRouter.put('/favStation/:stationId', checkedLogin, favStations);
userRouter.get('/favStationList', favStationsList);

export default userRouter;
