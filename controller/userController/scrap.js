import User from '../../model/user';
import { ObjectID } from 'mongodb';

/**
 *
 * @api {put} /user/scrap/:communityId
 * @apiDescription 커뮤니티 게시글을 스크랩 삽입 / 취소합니다.
 * @apiName 커뮤니티 게시글 스크랩
 * @apiGroup user
 *
 * @user {userId} userId req
 * @param {communityId} communityID req
 *
 * @apiSuccess {Number} 201 커뮤니티 게시글 스크랩 삽입 / 삭제 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *    {
 *        "scrapPosts": [
 *            "5f200a8538e2dd2e7ff53e78",
 *            "5f20dd54c39d320ac7c0d675"
 *        ],
 *        "_id": "5f29806a386383559c78ed08",
 *        "userId": "622716008356900",
 *        "name": "이유정"
 *    }
 * @apiError {Number} 500 커뮤니티 게시글 스크랩 삽입 / 삭제 실패
 */

const scrap = async (req, res) => {
    const { communityId } = req.params;
    const { userId } = req.user;
    try {
        const user = await User.findOne(
            { userId: userId },
            { name: 1, userId: 1, scrapPosts: 1 }
        );

        if (await User.findOne({ userId: userId, scrapPosts: communityId })) {
            await User.update(
                { userId: userId, scrapPosts: communityId },
                {
                    $pull: { scrapPosts: ObjectID(communityId) },
                },
                { new: true }
            );
        } else {
            await User.update(
                { userId: userId },
                {
                    $push: { scrapPosts: ObjectID(communityId) },
                },
                { new: true }
            );
        }
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

module.exports = scrap;
