import express from 'express';
import stationList from '../controller/stationController/stationList';
import stationDetail from '../controller/stationController/stationDetail';
import stationSearch from '../controller/stationController/stationSearch';

import { checkObjectId } from '../middlewares';

const stationRouter = express.Router();

stationRouter.get('/search', stationSearch);
stationRouter.get('/', stationList);
stationRouter.get('/:id', checkObjectId, stationDetail);

export default stationRouter;
