import Post from '../../model/community';

//PUT
const postEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!post) {
            res.status(404);
            return;
        }

        req.body = post;
        res.status(201).send('성공적으로 게시글이 수정되었습니다.');
    } catch (err) {
        console.log(err);
    } finally {
        res.end();
    }
};

module.exports = postEdit;
