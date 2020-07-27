import Comment from '../../model/comment';

const commentDelete = async (req, res) => {
    const { commentId } = req.params;

    if (!ObjectId.isValid(commentId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }

    try {
        await Comment.findByIdAndRemove(commentId);
        res.status(200).send('성공적으로 댓글이 삭제되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentDelete;
