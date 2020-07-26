import express from 'express';

import commentCreate from '../controller/commentController/commentCreate';
import commentDelete from '../controller/commentController/commentDelete';
import commentEdit from '../controller/commentController/commentEdit';
import commentList from '../controller/commentController/commentList';

const commentRouter = express.Router();

commentRouter.put('/:communityId/:commentId', commentEdit);
commentRouter.get('/:communityId', commentList);
commentRouter.post('/:communityId', commentCreate);
commentRouter.delete('/:commentId', commentDelete);

module.exports = commentRouter;
