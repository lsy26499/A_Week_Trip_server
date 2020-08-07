import express from 'express';

import postCreate from '../controller/communityController/postCreate';
import postDelete from '../controller/communityController/postDelete';
import postEdit from '../controller/communityController/postEdit';
import postList from '../controller/communityController/postList';
import postView from '../controller/communityController/postView';
import postSearch from '../controller/communityController/postSearch';

import {
    checkObjectId,
    checkQuery,
    checkCommunityForm,
    uploadImage,
    checkedLogin,
} from '../middlewares';

const communityRouter = express.Router();

communityRouter.get('/search', checkQuery, postSearch);
communityRouter.post(
    '/',
    uploadImage,
    checkedLogin,
    checkCommunityForm,
    postCreate
);
communityRouter.delete('/:id', checkedLogin, checkObjectId, postDelete);
communityRouter.put(
    '/',
    checkObjectId,
    checkedLogin,
    checkCommunityForm,
    postEdit
);
communityRouter.get('/', postList);
communityRouter.get('/:id', checkObjectId, postView);

export default communityRouter;
