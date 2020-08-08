import Comment from '../../model/comment';
import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

/**
 * @api {get} /comment/:communityId 코멘트 리스트
 * @apiDescription 게시글의 코멘트 리스트를 불러옵니다.
 * @apiName 코멘트 리스트
 * @apiGroup comment
 *
 * @param {ObjectID} communityId 해당 커뮤니티 오브젝트 아이디
 *
 * @apiSuccess {Number} 200 코멘트 리스트 불러오기 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *  [
 *      {
 *          "userId": 1,
 *          "name": "이유정",
 *          "comment": "첫 번째 댓글입니다.",
 *          "createdAt": 2020-08-01,
 *          "updatedAt": 2020-08-01,
 *          "secret": false
 *      },
 *      {
 *          "userId": 2,
 *          "name": "김유정",
 *          "comment": "두 번째 댓글입니다.",
 *          "createdAt": 2020-08-01,
 *          "updatedAt": 2020-08-01,
 *          "secret": true
 *      }
 *  ]
 * @apiError {Number} 400 커뮤니티 아이디가 없음
 * @apiError {Number} 500 코멘트 리스트 요청 실패
 */

const commentList = async (req, res) => {
    const { communityId } = req.params;

    if (!ObjectId.isValid(communityId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }

    try {
        const comment = await Comment.aggregate([
            { $match: { communityID: ObjectID(communityId) } },
            {
                $project: {
                    userId: 1,
                    name: 1,
                    comment: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M',
                            date: '$createdAt',
                            timezone: 'Japan',
                        },
                    },
                    updatedAt: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M',
                            date: '$updatedAt',
                            timezone: 'Japan',
                        },
                    },
                    secret: 1,
                },
            },
        ]);
        res.status(200).send(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentList;
