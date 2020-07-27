import Comment from '../../model/comment';
import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

//GET
const commentList = async (req, res) => {
    const { communityId } = req.params;

    if (!ObjectId.isValid(communityId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }

    try {
        const comment = await Comment.aggregate([
            { $match: { communityID: ObjectID(communityId) } },
            {
                $project: {
                    userId: 1,
                    name: 1,
                    comment: 1,
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
                    secret: 1,
                },
            },
        ]);
        res.status(200).send(comment);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentList;
