import mongoose from 'mongoose';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

const { ObjectId } = mongoose.Types;
const { check, validationResult } = require('express-validator');

//? multer
const s3 = new aws.S3({
    //FIXME: 진짜 aws에 연결하게 되면 바꿔 주세요!
    secretAccessKey: '',
    accessKeyId: '',
    region: 'ap-northeast-1',
});

const multerUpload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'AWT/image', //! bucket은 임시입니다! image라는 폴더에 들어갈 것입니다.
        // FIXME: 버켓 이름을 수정해 주세요!
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    }),
});

//! TODO: 이미지 폼 이름: imageURL, API POST 할 때도 imageURL로 보내 주세요
export const uploadImage = multerUpload.single('imageURL');

//? middlewares

//! 만약에 이 미들웨어 때문에 작동이 되지 않는다면 주석 처리해 주세요.
export const checkPlanForm = async (req, res, next) => {
    await check('list').exists().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send('Plan을 채워 주세요.');
    }
    return next();
};

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
