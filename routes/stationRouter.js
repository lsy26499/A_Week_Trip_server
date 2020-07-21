import express from 'express';
import stationList from '../controller/stationController/stationList';
import stationDetail from '../controller/stationController/stationDetail';

export const stationRouter = express.Router();

// stationRouter.get('/', stationList); // /station
// stationRouter.get('/:id', stationDetail); // /station/:id
