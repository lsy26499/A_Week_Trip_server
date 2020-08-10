import BestPlan from '../../model/bestplan';

/**
 * @api {get} /bestplan
 * @apiDescription 추천 코스를 요청합니다.
 * @apiName 추천 코스 요청
 * @apiGroup bestplan
 *
 * @param {num} Number req
 *
 *
 * @apiSuccess {Number} 200 추천 코스 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *
 *  {
 *       num: 1,
 *       list: ['#AWT추천', '#이렇게가봐요', '#5일여행', '#평범', '#체력만만']
 *  },
 *  {
 *       num: 2,
 *       list: ['#전남선', '#고즈넉한', '#한옥마을', '#전라도뿌수기']
 *  },
 *  {
 *       num: 3,
 *       list: ['#전라에서경상까지', '#남들다가는곳', '#인스타맛집', '#잠안자는여행']
 *  }
 *
 * @apiError {Number} 404 추천 코스 요청 실패
 * @apiError {Number} 500 계획 요청 실패
 */

const bestPlan = async (req, res) => {
    const { num } = req.params;
    try {
        if (num) {
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
        } else res.status(404).send('추천 코스가 없습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default bestPlan;
