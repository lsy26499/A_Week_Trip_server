import Community from '../../model/community';

/**
 * @api {get} /community/search
 * @apiDescription 검색된 게시글 정보를 요청합니다.
 * @apiName 게시글 검색
 * @apiGroup community
 *
 * @query {contnet} /community/search/?contnet=아시나요
 *
 * @apiSuccess {Number} 200 검색된 게시글 정보 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *
 *      {
 *          "view": 0,
 *          "_id": "5f27c8d2f22a090e8dce88ba",
 *          "userId": "123132123213123",
 *          "name": "이유정",
 *          "title": "서울역 가는 법 아시나요",
 *          "article": "대전에서 서울역까지 가는 법 아시는 분..",
 *          "createdAt": "2020-08-03T08:20:34.774Z",
 *          "updatedAt": "2020-08-03T08:20:34.774Z",
 *          "order": 13,
 *          "__v": 0
 *      },
 *      {
 *          "view": 0,
 *          "_id": "5f20dd57c39d320ac7c0d678",
 *          "userId": "31231231231231323",
 *          "name": "박보검",
 *          "title": "안동 고등어 맛집 아시나요 ㅠ",
 *          "article": "안동 왔는데 추천 좀 해 주세요",
 *          "createdAt": "2020-07-29T02:22:15.726Z",
 *          "updatedAt": "2020-07-29T02:22:15.726Z",
 *          "order": 11,
 *          "__v": 0
 *      }
 *
 * @apiError {Number} 400 검색 옵션이 없음
 * @apiError {Number} 500 검색된 게시글 정보 요청 실패
 */

const postSearch = async (req, res) => {
    const { content } = req.query;

    let options = [
        { title: new RegExp(content) },
        { article: new RegExp(content) },
    ];

    try {
        const community = await Community.find({ $or: options }).sort({
            order: -1,
        });
        if (!community) {
            res.status(400).send('검색 옵션이 없습니다.');
        }
        res.status(200).send(community);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default postSearch;
