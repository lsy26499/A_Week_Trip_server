import express from 'express';
import { checkObjectId, checkQuery } from '../middlewares';

import postCreate from '../controller/communityController/postCreate';
import postDelete from '../controller/communityController/postDelete';
import postEdit from '../controller/communityController/postEdit';
import postList from '../controller/communityController/postList';
import postView from '../controller/communityController/postView';
import postSearch from '../controller/communityController/postSearch';
const communityRouter = express.Router();

communityRouter.get('/search', checkQuery, postSearch); // 서치
communityRouter.post('/', postCreate); // 생성
communityRouter.delete('/:id', checkObjectId, postDelete); // 지움
communityRouter.put('/:id', checkObjectId, postEdit); // 수정
communityRouter.get('/', postList); // 전체 보여 주기
communityRouter.get('/:id', checkObjectId, postView); // 하나만 보여 주기

export default communityRouter;
