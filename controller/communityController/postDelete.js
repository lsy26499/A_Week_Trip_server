import Post from '../../model/community';
import User from '../../model/user';
import { ObjectID } from 'mongodb';

/**
 * @api {delete} /community/id
 * @apiDescription 해당 게시글을 삭제합니다.
 * @apiName 게시글 삭제
 * @apiGroup community
 *
 * @param {id} commentId req
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 게시글 삭제 성공
 * @apiError {Number} 500 게시글 삭제 실패
 */

const postDelete = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        await Post.findByIdAndRemove(id);

        const user = await User.find({
            scrapPosts: ObjectID(id),
            userId: userId,
        });

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
