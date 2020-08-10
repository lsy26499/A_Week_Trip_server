import Comment from '../../model/comment';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

/**
 * @api {delete} /comment/:commentId
 * @apiDescription 기존의 코멘트를 삭제합니다.
 * @apiName 코멘트 삭제
 * @apiGroup comment
 *
 * @param {ObjectID} commentId req 해당 댓글 오브젝트 아이디
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 댓글 삭제 성공
 *
 *  {
 *      "성공적으로 댓글이 삭제되었습니다."
 *  }
 *
 * @apiError {Number} 400 댓글 아이디가 없음 or 잘못된 경로
 * @apiError {Number} 500 댓글 삭제 실패
 */

const commentDelete = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = req.user;

    if (!ObjectId.isValid(commentId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }

    try {
        if (Comment.find({ userId: userId })) {
            await Comment.findByIdAndRemove(commentId);
            res.status(200).send('성공적으로 댓글이 삭제되었습니다.');
        } else {
            res.status(400).send('잘못된 경로입니다.');
        }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentDelete;
