import Community from '../../model/community';
import { post } from 'request';
import { ObjectID } from 'mongodb';

const postView = async (req, res) => {
    const { id } = req.params;

    try {
        const view = await Community.findOne({ _id: id });

        if (view) {
            view.view++;
            view.save();
        }

        const postView = await Community.aggregate([
            { $match: { _id: ObjectID(id) } },
            {
                $project: {
                    view: 1,
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
    } finally {
        res.end();
    }
};

export default postView;
