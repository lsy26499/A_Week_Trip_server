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

        /**
         * 전체 유저 중에서 이 게시글을 scrapPosts한 유저를 찾는다.
         * user.scrapPosts를 pop해 줘야 되는데 map으로 돌려서 삭제를 해야 되나?
         *
         * FIXME: scrapPosts 배열 안의 해당 게시글을 전부 삭제할 수 있게 해야 합니다.
         */

        const user = await User.find({ scrapPosts: id });
        if (user) {
            // user.scrapPosts.pop({ _id: ObjectID(id) });
            // user.save();
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
