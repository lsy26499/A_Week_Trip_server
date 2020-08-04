import express from 'express';

import commentCreate from '../controller/commentController/commentCreate';
import commentDelete from '../controller/commentController/commentDelete';
import commentEdit from '../controller/commentController/commentEdit';
import commentList from '../controller/commentController/commentList';
import { checkCommentForm, checkedLogin } from '../middlewares';

const commentRouter = express.Router();

commentRouter.put(
    '/:communityId/:commentId',
    checkedLogin,
    checkCommentForm,
    commentEdit
);
commentRouter.get('/:communityId', commentList);
commentRouter.post(
    '/:communityId',
    checkedLogin,
    checkCommentForm,
    commentCreate
);
commentRouter.delete('/:commentId', checkedLogin, commentDelete);

module.exports = commentRouter;
