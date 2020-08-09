import BestPlan from '../../model/bestplan';

/**
 * @api {get} /bestplan
 * @apiDescription 추천 코스 리스트를 요청합니다.
 * @apiName 추천 코스 리스트 요청
 * @apiGroup bestplan
 *
 * @apiSuccess {Number} 200 추천 코스 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 * [
 *   {
 *     plan: [ [Object], [Object], [Object], [Object], [Object] ],
 *     _id: 5f25373095677c0f07a867bb,
 *     num: 1
 *   },
 *   {
 *     plan: [ [Object], [Object], [Object], [Object], [Object] ],
 *     _id: 5f253730934337c0f07a867bb,
 *     num: 2
 *   }
 * ]
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
