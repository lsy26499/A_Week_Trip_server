import BestPlan from '../../model/bestplan';

/**
 * @api {get} /bestplan
 * @apiDescription 추천 코스를 요청합니다.
 * @apiName 추천 코스 요청
 * @apiGroup bestplan
 *
 * @param {num} Number req
 *  [
 *     {
 *         region: '서울',
 *         day: '1',
 *         title: '햇빛 쨍쨍한 날의 투어',
 *         course: [
 *             '인사동 정독도서관',
 *             '삼청동 꽃들 구경 길거리 걸어다니기',
 *             '광화문 가기 전에 두가헌에서 점심',
 *             '메밀맛집 투어 칸다소바 => 잘빠진메밀',
 *             '효자 베이커리',
 *             '불국사',
 *             '술 사들고 숙소로',
 *         ],
 *     },
 *     {
 *         region: '군산',
 *         day: '2',
 *         title: '추억은 방울방울',
 *         course: [
 *             '기찻길에서 사진 찍기',
 *             '숙소 도착해서 짐 풀기',
 *             '군산 명물 짜장면집 점심',
 *             '테디베어 박물관 다녀오기',
 *             '동국사 구경',
 *             '숙소',
 *         ],
 *     },
 *  ]
 * @apiSuccess {Number} 200 추천 코스 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 * @apiError {Number} 500 계획 요청 실패
 */

const bestPlan = async (req, res) => {
    const { num } = req.params;
    try {
        const bestPlan = await BestPlan.find(
            {
                num: num,
            },
            {
                num: 1,
                plan: 1,
            }
        );
        res.status(200).send(bestPlan);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default bestPlan;
