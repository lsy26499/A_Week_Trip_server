import Comment from '../../model/comment';

const commentDelete = async (req, res) => {
    const { commentid } = req.params;
    try {
        await Comment.findByIdAndRemove(commentid);
        res.status(200).send('성공적으로 댓글이 삭제되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports = commentDelete;
