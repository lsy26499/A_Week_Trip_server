import express from 'express';
import { checkObjectId } from '../middlewares';

import postCreate from '../controller/communityController/postCreate';
import postDelete from '../controller/communityController/postDelete';
import postEdit from '../controller/communityController/postEdit';
import postList from '../controller/communityController/postList';
import postView from '../controller/communityController/postView';

const communityRouter = express.Router();

// communityRouter.post('/', postCreate); // 생성
// communityRouter.delete('/:id', postDelete); // 지움
communityRouter.put('/:id', checkObjectId, postEdit); // 수정
// communityRouter.get('/', postList); // 전체 보여 주기
// communityRouter.get('/:id', postView); // 하나만 보여 주기

export default communityRouter;
