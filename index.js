// Server Setting
import express from 'express';

//middleWares
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mogran from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import 'core-js';
import './db';
import planRouter from './routes/planRouter';
import userRouter from './routes/userRouter';
import stationRouter from './routes/stationRouter';
import communityRouter from './routes/communityRouter';
import commentRouter from './routes/commnetRouter';
import bestPlanRouter from './routes/bestPlanRouter';

import { jwtParser } from './middlewares';

// config
dotenv.config();

// Express
const app = express();
const PORT = process.env.PORT;

// cookie-parser
app.use(cookieParser());

// body-parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

//jwt Middleware
app.use(jwtParser);

// helmet
app.use(helmet());

// mogran
app.use(mogran('dev'));

// router
app.use('/plan', planRouter);
app.use('/user', userRouter);
app.use('/station', stationRouter);
app.use('/community', communityRouter);
app.use('/comment', commentRouter);
app.use('/bestplan', bestPlanRouter);

// SERVER START
app.listen(PORT, () => console.log(`✅ Listening on http://localhost:${PORT}`));
