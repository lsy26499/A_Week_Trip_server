import express from 'express';
import stationList from '../controller/stationController/stationList';
import {
    stationDetail,
    stationRandomDetail,
} from '../controller/stationController/stationDetail';
import stationSearch from '../controller/stationController/stationSearch';
import stationPost from '../controller/stationController/stationPost';

import { checkObjectId, checkQuery, checkStationForm } from '../middlewares';

const stationRouter = express.Router();

stationRouter.get('/', stationList);
stationRouter.get('/search', checkQuery, stationSearch);
stationRouter.get('/random', stationRandomDetail);
stationRouter.get('/:id', checkObjectId, stationDetail);
stationRouter.post('/', checkStationForm, stationPost);

export default stationRouter;
