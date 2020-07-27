import Post from '../../model/community';

//DELETE
const postDelete = async (req, res) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndRemove(id);
        res.status(200).send('성공적으로 게시글이 삭제되었습니다.');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = postDelete;
