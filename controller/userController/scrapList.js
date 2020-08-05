import User from '../../model/user';

/**
 * @api {put} /user/scrap
 * @apiDescription 스크랩한 게시글의 리스트를 요청합니다.
 * @apiName 스크랩 게시글 리스트 요청
 * @apiGroup user
 *
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 201 스크랩한 게시글 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 * ! createdAt과 updatedAt이 ISO로 들어가기 때문에 제외하고 사용해 주세요
 *       HTTP/1.1 201
 *    {
 *        "scrapPosts": [
 *            {
 *                "view": 12,
 *                "_id": "5f200a8538e2dd2e7ff53e78",
 *                "userId": "32123123",
 *                "name": "이유정",
 *                "title": "안녕하세요",
 *                "article": "첫 번째 게시글입니다 ㅎㅎㅎㅎㅎㅎ",
 *                "createdAt": "2020-07-28T11:22:45.401Z",
 *                "updatedAt": "2020-07-28T11:29:22.272Z",
 *                "order": 3,
 *                "__v": 0
 *            },
 *            {
 *                "view": 0,
 *                "_id": "5f20dd57c39d320ac7c0d678",
 *                "userId": "3311111111",
 *                "name": "김광현",
 *                "title": "더미 데이터가 문제네요",
 *                "article": "개발은 재미있습니다",
 *                "createdAt": "2020-07-29T02:22:15.726Z",
 *                "updatedAt": "2020-07-29T02:22:15.726Z",
 *                "order": 11,
 *                "__v": 0
 *            }
 *        ]
 *    }
 * @apiError {Number} 500 스크랩한 게시글 리스트 요청 실패
 */

const scrapList = async (req, res) => {
    const { userId } = req.user;

    try {
        const scrapList = await User.findOne(
            { userId: userId },
            { scrapPosts: true, _id: false }
        )
            .populate('scrapPosts')
            .exec();
        res.status(200).send(scrapList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

module.exports = scrapList;
