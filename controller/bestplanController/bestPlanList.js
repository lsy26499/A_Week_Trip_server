import BestPlan from '../../model/bestplan';

/**
 * @api {get} /bestplan
 * @apiDescription 추천 코스 리스트를 요청합니다.
 * @apiName 추천 코스 리스트 요청
 * @apiGroup bestplan
 *
 * {
 *      num: 1,
 *      list: ['#AWT추천', '#이렇게가봐요', '#5일여행', '#평범', '#체력만만'],
 *      plan: [
 *          {
 *              region: '군산',
 *              day: '1',
 *              title: '군산 구석구석',
 *              course: [
 *                  '철길마을',
 *                  '테디베어 박물관',
 *                  '지린성 짜장면',
 *                  '군산 스탬프 투어',
 *                  '동국사',
 *                  '이성당',
 *              ],
 *          },
 *          {
 *              region: '아산',
 *              day: '2',
 *              title: '전통을 느끼자',
 *              course: ['외암민속마을', '온양 전통시장', '온천랜드'],
 *          }
 * }
 *
 * @apiSuccess {Number} 200 추천 코스 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 * @apiError {Number} 500 계획 요청 실패
 */

const bestPlanList = async (req, res) => {
    try {
        const bestPlanList = await BestPlan.aggregate([
            {
                $project: {
                    num: 1,
                    list: 1,
                    plan: 1,
                },
            },
        ]);
        res.status(200).send(bestPlanList);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default bestPlanList;
