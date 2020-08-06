import mongoose from 'mongoose';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './model/user';

dotenv.config();

const { ObjectId } = mongoose.Types;
const { check, validationResult } = require('express-validator');

export const checkedLogin = (req, res, next) => {
    if (!req.user) {
        res.status(401).send('로그인을 해 주세요.');
        return;
    }
    next();
};

export const jwtParser = async (req, res, next) => {
    const { authorization } = req.headers;
    try {
        if (!authorization) {
            return next();
        } else {
            //토큰 찾기
            const decoded = jwt.verify(authorization, process.env.JWT_SECRET);

            //토큰 재발급
            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
                const user = await User.findById(decoded._id);
                user.jsonWebToken = jwt.sign(
                    { user },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '7d',
                    }.save()
                );
            }

            //해석된 토큰 받기
            req.user = {
                userId: decoded.user.userId,
                name: decoded.user.name,
                _id: decoded.user._id,
                favStation: decoded.user.favStation,
                scrapPosts: decoded.user.scrapPosts,
            };
            next();
        }
    } catch (err) {
        console.log(err);
        return next();
    }
};

//! multer
const s3 = new aws.S3({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'ap-northeast-1',
});

const multerUpload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'AWT/image',
        key: function (req, file, cb) {
            let extension = path.extname(file.originalname);
            cb(null, Date.now().toString() + extension);
        },
        limits: { fileSize: 5 * 1024 * 1024 },
    }),
});

export const uploadImage = multerUpload.single('imageURL');

//? middlewares

export const checkPlanForm = async (req, res, next) => {
    await check('list').exists().run(req);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send('Plan을 채워 주세요.');
    }
    return next();
};

export const checkCommentForm = async (req, res, next) => {
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
    await check('station').notEmpty().isString().run(req);
    await check('coord').exists().run(req);

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
