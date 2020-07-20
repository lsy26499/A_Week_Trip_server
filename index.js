// Server Setting
import express from 'express';
import session from 'express-session';

//middleWares
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mogran from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import 'core-js';
import './db';
import planRouter from './routes/palnRouter';
import userRouter from './routes/userRouter';
import stationRouter from './routes/stationRouter';
import communityRouter from './routes/communityRouter';
import commentRouter from './routes/commnetRouter';
import bestplanRouter from './routes/bestpalnRouter';

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
// helmet
app.use(helmet());
// mogran
app.use(mogran('dev'));
// cors
app.use(
    cors({
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);
// Express-session
app.use(
    session({
        secret: '시크릿 뜻이 뭐야? 비밀 시크릿 뜻이 뭐냐니까? 비밀',
        resave: false,
        saveUninitialized: true,
        //store: new CookieStore({
        //  mongooseConnection: mongoose.connection
        //})
    })
);

// router
app.use('/plan', planRouter);
app.use('/user', userRouter);
app.use('/station', stationRouter);
app.use('/community', communityRouter);
app.use('/comment', commentRouter);
app.use('/bestplan', bestplanRouter);

// SERVER START
app.listen(PORT, () => console.log(`✅ Listening on http://localhost:${PORT}`));