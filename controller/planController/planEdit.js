import Plan from '../../model/plan';

/**
 * @api {put} /plan
 * @apiDescription 기존의 플랜을 수정합니다
 * @apiName 플랜 수정
 * @apiGroup plan
 *
 * @params {_id} mongoDB.objectID req
 *
 * @apiSuccess {Number} 201 플랜 수정 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *    {
 *        _id: ObjectId('5f228233b9611550862d9d34'),
 *        userId: '1',
 *        list: [
 *            {
 *                day01: {
 *                    date: '2020-07-29',
 *                    tasks: [{ region: '서울', toDos: ['기차 타지 말기', '기차에서 밥 먹지 말기'] }],
 *                },
 *            },
 *            {
 *                day02: {
 *                    date: '2020-07-30',
 *                    tasks: [{ region: '화본', toDos: ['안동 갔다가 여기 찍기', '유명하다는 국수 먹기'] }],
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
 * @apiError {Number} 404 수정할 플랜이 없음
 * @apiError {Number} 500 플랜 수정 실패
 */

const planEdit = async (req, res) => {
    const { _id } = req.user;
    try {
        Plan.findByIdAndUpdate(_id, req.body, (err, task) => {
            if (err) {
                return res.status(404).send(err);
            } else res.status(200).send(task);
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default planEdit;
