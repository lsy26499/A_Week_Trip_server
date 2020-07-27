import Plan from '../../model/plan';

const taskCreate = async (req, res) => {
    const { userId, list } = req.body;
    const taskCreate = new Plan({
        userId,
        list,
    });
    try {
        if (userId) {
            const newTask = await taskCreate.save();
            res.status(200).send(newTask);
        } else res.status(400).send('계획을 생성하지 못했습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default taskCreate;
