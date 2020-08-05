import Plan from '../../model/plan';

/**
 * @api {delete} '/plan' 플랜 삭제
 * @apiDescription 계획을 삭제합니다.
 * @apiName 계획 삭제
 * @apiGroup plan
 *
 * @user {_id} mongoDB.ObjectID req
 *
 * @apiSuccess {Number} 200 플랜 삭제 성공
 * @apiError {Number} 404 플랜이 존재하지 않음
 * @apiError {Number} 500 플랜 삭제 실패
 */

const taskDelete = async (req, res) => {
    const { _id } = req.user;
    try {
        if (_id) {
            await Plan.findByIdAndDelete(_id);
            res.status(200).send('계획을 삭제하였습니다.');
        } else res.status(404).send('계획이 존재하지 않습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default taskDelete;
