import Community from '../../model/community';

const postView = async (req, res) => {
    const { _id } = req.params;
    try {
        const postView = await Community.aggregate([
            { $match: { _id: _id } },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    name: 1,
                    title: 1,
                    article: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                            timezone: 'Japan',
                        },
                    },
                    updatedAt: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$updatedAt',
                            timezone: 'Japan',
                        },
                    },
                },
            },
        ]);
        res.status(200).send(postView);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postView;
