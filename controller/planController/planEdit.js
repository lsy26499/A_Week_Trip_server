import Plan from '../../model/plan';

const taskEdit = async (req, res) => {
    const { id } = req.params;
    try {
        Plan.findByIdAndUpdate(id, req.body, (err, task) => {
            if (err) {
                return res.status(404).send(err);
            } else res.status(200).send(task);
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

export default taskEdit;
