import Comment from '../../model/comment';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

/**
 * @api {post} /comment/:communityId
 * @apiDescription 새로운 코멘트를 생성합니다.
 * @apiName 코멘트 생성
 * @apiGroup comment
 *
 * @param {ObjectID} communityId 해당 커뮤니티 오브젝트 아이디
 *
 * @apiSuccess {Number} 201 댓글 생성 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *  {
 *      "userId": 1,
 *      "name": "이유정",
 *      "comment": "댓글입니다.",
 *      "communityID": communityId,
 *      "secret": false,
 *      "createdAt": 2020-07-28T11:22:45.401+00:00,
 *      "updatedAt": 2020-07-28T11:22:45.401+00:00
 *  }
 * @apiError {Number} 400 커뮤니티 아이디가 없음
 * @apiError {Number} 500 댓글 생성 실패
 */

const commentCreate = async (req, res) => {
    const { userId, name, comment, secret } = req.body;
    const { communityId } = req.params;

    if (!ObjectId.isValid(communityId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }
    const comments = new Comment({
        userId,
        name,
        comment,
        communityID: communityId,
        secret,
    });

    try {
        await comments.save();
        res.status(201).send(comments);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentCreate;
