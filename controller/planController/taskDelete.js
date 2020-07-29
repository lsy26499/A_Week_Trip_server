import Plan from '../../model/plan';

const taskDelete = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        if (id) {
            await Plan.findByIdAndDelete(id);
            res.status(200).send('계획을 삭제하였습니다.');
        } else res.status(404).send('계획이 존재하지 않습니다.');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default taskDelete;
