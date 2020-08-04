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
userRouter.post('/logout', logout);
userRouter.put('/scrap/:userId/:communityId', checkedLogin, scrap);
userRouter.get('/myPosts/:id', myPosts);
userRouter.get('/scrap/:id', scrapList);
userRouter.put('/favStation/:userId/:stationId', checkedLogin, favStations);
userRouter.get('/favStationList/:id', favStationsList);

export default userRouter;
