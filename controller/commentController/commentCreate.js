import Comment from '../../model/comment';

//POST
const commentCreate = async (req, res) => {
    const { userId, name, comment, createdAt } = req.body;
    const { communityId } = req.params;

    if (!ObjectId.isValid(communityId)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }

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
