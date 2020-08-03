import Plan from '../../model/plan';

const planList = async (req, res) => {
    const { userId } = req.params;
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
