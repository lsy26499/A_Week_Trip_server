import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;
const { check, validationResult } = require('express-validator');

export const checkCommentForm = async (req, res, next) => {
    // TODO: userId에 대한 유효성을 검사해 주세요.

    await check('secret').notEmpty().isBoolean().run(req);
    await check('name').notEmpty().isString().run(req);
    await check('comment').exists().isString().trim().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send('Comment Form을 올바르게 작성해 주세요.');
    }
    return next();
};

export const checkCommunityForm = async (req, res, next) => {
    //TODO: UserId에 대한 유효성 검사를 해 주세요.
    await check('name').notEmpty().isString().run(req);
    await check('title').isLength({ min: 1, max: 30 }).isString().run(req);
    await check('article').exists().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send('Post Form을 올바르게 작성해 주세요.');
    }
    return next();
};

export const checkStationForm = async (req, res, next) => {
    //TODO: station POST를 생성하세요.

    await check('station').notEmpty().isString().run(req);
    await check('stationNumber').notEmpty().isNumeric().run(req);
    await check('stationInfo').notEmpty().isString().run(req);
    await check('coord').exists().run(req);
    await check('lodging').exists().isArray().run(req);
    await check('food').exists().isArray().run(req);
    await check('tourism').exists().isArray().run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send('Station Form을 올바르게 작성해 주세요.');
    }
    return next();
};

export const checkObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }
    return next();
};

export const checkQuery = (req, res, next) => {
    const { content } = req.query;
    if (!content) {
        res.status(400).send('검색 값이 비어 있습니다.');
        return;
    }
    return next();
};
