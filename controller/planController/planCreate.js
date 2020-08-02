import Plan from '../../model/plan';

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
