import Plan from '../../model/plan';

const taskList = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const taskList = await Plan.findById({ _id: id });
            res.status(200).send(taskList);
        } else if (!id) {
            res.status(404).send('계획이 없습니다.');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

export default taskList;
