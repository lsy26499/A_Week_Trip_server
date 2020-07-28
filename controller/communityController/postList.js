import Community from '../../model/community';

const postList = async (req, res) => {
    try {
        const postView = await Community.aggregate([
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    name: 1,
                    postNumber: 1,
                    order: 1,
                    title: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                            timezone: 'Japan',
                        },
                    },
                },
            },
        ]).sort({ order: -1 });
        res.status(200).send(postView);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postList;
