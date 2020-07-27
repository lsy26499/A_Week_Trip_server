import Comment from '../../model/comment';

//POST
const commentCreate = async (req, res) => {
    const { userId, name, comment, createdAt } = req.body;
    const { communityId } = req.params;

    const comments = new Comment({
        userId,
        name,
        comment,
        communityID: communityId,
        createdAt,
        secret,
    });

    try {
        await comments.save();
        res.status(201).send(comments);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentCreate;
