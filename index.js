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
import planRouter from './routes/planRouter';
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
// TODO: 혹시 이것을 누구라도 보신다면 cleanUp을 할 때 모든 라우터에 finally{res.end()}를 채워 주세요!
// TODO: 컨트롤러 상단에 주석으로 설명을 작성해도 좋을 것 같습니다.
// TODO: user가 구현이 되면 전체적으로 user 인증 검증을 해 주세요!
/**
 * ! ex)
 * @param {id} req userId
 *
 */

app.use('/plan', planRouter);
app.use('/user', userRouter);
app.use('/station', stationRouter);
app.use('/community', communityRouter);
app.use('/comment', commentRouter);
app.use('/bestplan', bestplanRouter);

// SERVER START
app.listen(PORT, () => console.log(`✅ Listening on http://localhost:${PORT}`));
