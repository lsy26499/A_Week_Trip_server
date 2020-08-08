import Plan from '../../model/plan';

/**
 * @api {get} /plan
 * @apiDescription 플랜을 요청합니다.
 * @apiName 플랜 요청
 * @apiGroup plan
 *
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 플랜 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *    {
 *        _id: ObjectId('5f228233b9611550862d9d34'),
 *        userId: '1311313312132',
 *        list: [
 *            {
 *                day01: {
 *                    date: '2020-07-29',
 *                    tasks: [{ region: '서울', toDos: ['기차 타기', '기차에서 밥 먹기'] }],
 *                },
 *            },
 *            {
 *                day02: {
 *                    date: '2020-07-30',
 *                    tasks: [{ region: '부산', toDos: ['부산 어묵 먹기', '해운대에서 요트 타기'] }],
 *                },
 *            },
 *            {
 *                day03: {
 *                    date: '2020-08-01',
 *                    tasks: [{ region: '전주', toDos: ['전주 비빔밥 먹기', '한옥 마을 체험하기'] }],
 *                },
 *            },
 *        ],
 *        order: 70
 *    }
 * @apiError {Number} 400 요청할 계획이 없음
 * @apiError {Number} 500 계획 요청 실패
 */

const planList = async (req, res) => {
    const { userId } = req.user;
    try {
        if (userId) {
            const planList = await Plan.find({ userId: userId });
            res.status(200).send(planList);
        } else if (!userId) {
            res.status(404).send('계획이 없습니다.');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

export default planList;
