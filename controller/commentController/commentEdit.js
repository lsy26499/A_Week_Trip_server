import Comment from '../../model/comment';

const commentEidt = async (req, res) => {
    const { communityId, commentId } = req.params;

    try {
        const comment = await Comment.findOneAndUpdate(
            { communityID: communityId, _id: commentId },
            req.body,
            {
                new: true,
            }
        );
        if (!comment) {
            res.status(404);
            return;
        }
        req.body = comment;
        res.status(201).send('댓글이 정상적으로 수정되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = commentEidt;
