import Community from '../../model/community';

/**
 * @api {get} /community
 * @apiDescription 커뮤니티 게시글 리스트를 요청합니다.
 * @apiName 커뮤니티 게시글 리스트 요청
 * @apiGroup community
 *
 * @apiSuccess {Number} 200 커뮤니티 게시글 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *
 *        {
 *            "_id": "5f293c76922eef3c190c9f19",
 *            "userId": '131312312123321123',
 *            "name": "박보검",
 *            "title": "저도 여행을 해 봅니다",
 *            "order": 17,
 *            "updatedAt": "2020-08-04"
 *        },
 *        {
 *            "_id": "5f293b7505133c3b05fc4fde",
 *            "userId": '1231123123132132',
 *            "name": "손예진",
 *            "title": "여행 재미있어요",
 *            "order": 16,
 *            "updatedAt": "2020-08-05"
 *        }
 *
 * @apiError {Number} 500 커뮤니티 게시글 리스트 요청 실패
 */

const postList = async (req, res) => {
    try {
        const postView = await Community.aggregate([
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
        res.status(200).send(postView);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default postList;
