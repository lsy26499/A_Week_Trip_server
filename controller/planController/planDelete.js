import Plan from '../../model/plan';

/**
 * @api {delete} /plan
 * @apiDescription 계획을 삭제합니다.
 * @apiName 계획 삭제
 * @apiGroup plan
 *
 * @param {id} mongoDB.ObjectID req
 *
 * @apiSuccess {Number} 200 플랜 삭제 성공
 *
 *  {
 *      "계획을 삭제하였습니다."
 *  }
 *
 * @apiError {Number} 404 플랜이 존재하지 않음
 * @apiError {Number} 500 플랜 삭제 실패
 */

const planDelete = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            await Plan.findByIdAndDelete(id);
            res.status(200).send('계획을 삭제하였습니다.');
        } else res.status(404).send('계획이 존재하지 않습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default planDelete;
