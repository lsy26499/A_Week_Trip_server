import Plan from '../../model/plan';

/**
 * @api {post} /plan
 * @apiDescription 새로운 플랜을 생성합니다.
 * @apiName 플랜 생성
 * @apiGroup plan
 *
 * @body {userId} userId req
 * @body {list} list req
 *
 * @apiSuccess {Number} 201 플랜 생성 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *    {
 *        _id: ObjectId('5f228233b9611550862d9d34'),
 *        userId: '189787832321',
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
 * @apiError {Number} 400 생성할 계획이 없음
 * @apiError {Number} 500 계획 생성 실패
 */

const planCreate = async (req, res) => {
    const { userId, list } = req.body;
    const planCreate = new Plan({
        userId,
        list,
    });
    try {
        if (userId) {
            const newPlan = await planCreate.save();
            res.status(200).send(newPlan);
        } else res.status(400).send('계획을 생성하지 못했습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default planCreate;
