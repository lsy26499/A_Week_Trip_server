import Community from '../../model/community';

/**
 * @api {get} /user/myposts
 * @apiDescription 내가 쓴 게시글 리스트를 요청합니다.
 * @apiName 내가 쓴 게시글 리스트 요청
 * @apiGroup user
 *
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 내가 쓴 게시글 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *
 *   {
 *       "_id": "5f293c76922eef3c190c9f19",
 *       "userId": '1121389',
 *       "name": "이유정",
 *       "title": "두 번째 게시글입니다",
 *       "order": 17,
 *       "createdAt": "2020-08-04"
 *   },
 *   {
 *       "_id": "5f293b7505133c3b05fc4fde",
 *       "userId": '1121389',
 *       "name": "이유정",
 *       "title": "첫 번째 게시글입니다",
 *       "order": 16,
 *       "createdAt": "2020-08-04"
 *   }
 *
 * @apiError {Number} 500 내가 쓴 게시글 리스트 요청 실패
 */

const myPosts = async (req, res) => {
    const { userId } = req.user;

    try {
        const myPosts = await Community.aggregate([
            { $match: { userId: userId } },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    name: 1,
                    postNumber: 1,
                    order: 1,
                    title: 1,
                    updatedAt: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$updatedAt',
                            timezone: 'Japan',
                        },
                    },
                },
            },
        ]).sort({ order: -1 });
        res.status(200).send(myPosts);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = myPosts;
