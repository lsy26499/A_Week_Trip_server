import BestPlan from '../../model/bestplan';

const bestPlanList = async (req, res) => {
    try {
        const bestPlanList = await BestPlan.aggregate([
            {
                $project: {
                    num: 1,
                    list: 1,
                    plan: 1,
                },
            },
        ]);
        res.status(200).send(bestPlanList);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default bestPlanList;
