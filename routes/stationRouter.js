import express from 'express';
import stationList from '../controller/stationController/stationList';
import stationDetail from '../controller/stationController/stationDetail';
import stationSearch from '../controller/stationController/stationSearch';
import stationPost from '../controller/stationController/stationPost';

import { checkObjectId, checkQuery } from '../middlewares';

const stationRouter = express.Router();

stationRouter.get('/search', checkQuery, stationSearch);
stationRouter.get('/', stationList);
stationRouter.get('/:id', checkObjectId, stationDetail);
stationRouter.post('/', stationPost);

export default stationRouter;
