import BestPlan from '../../model/bestplan';

const bestPlan = async (req, res) => {
    const { num } = req.params;
    console.log(num);
    try {
        const bestPlan = await BestPlan.find(
            {
                num: num,
            },
            {
                num: 1,
                plan: 1,
            }
        );
        res.status(200).send(bestPlan);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default bestPlan;
