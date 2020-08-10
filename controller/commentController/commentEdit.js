import Comment from '../../model/comment';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

/**
 * @api {put} /comment/:communityId/:commentId
 * @apiDescription 기존의 코멘트를 수정합니다.
 * @apiName 코멘트 수정
 * @apiGroup comment
 *
 * @param {ObjectID} communityId 해당 커뮤니티 오브젝트 아이디
 * @param {ObjectID} commentId 해당 댓글 오브젝트 아이디
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 201 댓글 수정 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *  {
 *      "userId": "5f293b7505133c3b05fc4fde",
 *      "name": "이유정",
 *      "comment": "댓글 수정합니다.",
 *      "communityID": "7y841a7841532b2a45cj6et",
 *      "secret": true,
 *      "createdAt": 2020-07-28T11:22:45.401+00:00,
 *      "updatedAt": 2020-07-29T11:23:11.401+00:00
 *  }
 * @apiError {Number} 400 커뮤니티 아이디나 댓글 아이디가 없음
 * @apiError {Number} 404 댓글이 없음
 * @apiError {Number} 500 댓글 수정 실패
 */

const commentEidt = async (req, res) => {
    const { communityId, commentId } = req.params;
    const { userId } = req.user;

    if (!ObjectId.isValid(commentId) || !ObjectId.isValid(communityId)) {
        res.status(400).send('잘못된 아이디입니다.');
        return;
    }

    try {
        if (Comment.find({ userId: userId })) {
            const comment = await Comment.findOneAndUpdate(
                { communityID: communityId, _id: commentId },
                req.body,
                {
                    new: true,
                }
            );
            if (!comment) {
                res.status(404).send('댓글이 존재하지 않습니다.');
                return;
            }
            req.body = comment;
            res.status(201).send(comment);
        } else {
            res.status(400).send('잘못된 경로입니다.');
        }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentEidt;
