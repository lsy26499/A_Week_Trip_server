import Post from '../../model/community';
import User from '../../model/user';
import { ObjectID } from 'mongodb';

/**
 *
 * @param {userId} req User -> userId
 * @param {id} req Community -> _id
 */

//DELETE
const postDelete = async (req, res) => {
    const { id, userId } = req.params;

    try {
        await Post.findByIdAndRemove(id);

        const user = await User.find({ scrapPosts: ObjectID(id) });

        if (user) {
            await User.updateMany(
                { scrapPosts: ObjectID(id) },
                {
                    $pull: { scrapPosts: ObjectID(id) },
                },
                { new: true }
            );
        }
        res.status(200).send('성공적으로 게시글이 삭제되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = postDelete;
