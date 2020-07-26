import Comment from '../../model/comment';
import { ObjectID } from 'mongodb';

const commentList = async (req, res) => {
    const { communityId } = req.params;

    try {
        //const comment = await Comment.find({ communityID: communityId });
        const comment = await Comment.aggregate([
            { $match: { communityID: ObjectID(communityId) } },
            {
                $project: {
                    userId: 1,
                    name: 1,
                    comment: 1,
                    communityID: 1,
                    createdAt: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M',
                            date: '$createdAt',
                            timezone: 'Japan',
                        },
                    },
                    updatedAt: {
                        $dateToString: {
                            format: '%Y-%m-%d %H:%M',
                            date: '$updatedAt',
                            timezone: 'Japan',
                        },
                    },
                },
            },
        ]);
        res.status(200).send(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = commentList;
