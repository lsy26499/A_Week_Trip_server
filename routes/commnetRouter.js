import express from 'express';

import commentCreate from '../controller/commentController/commentCreate';
import commentDelete from '../controller/commentController/commentDelete';
import commentList from '../controller/commentController/commentList';

const commentRouter = express.Router();

commentRouter.get('/', commentList); //전체 불러오기
commentRouter.post('/', commentCreate); // 코멘트 작성하기
commentRouter.delete('/:id', commentDelete); // 코멘트 하나 삭제하기
