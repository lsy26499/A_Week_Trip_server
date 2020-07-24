import Comment from '../../model/comment';
import Community from '../../model/community';

const commentCreate = async (req, res) => {
    const { userId, name, comment, created_at } = req.body;
    const { id } = req.params;

    const commented = new Comment({
        userId,
        name,
        comment,
        created_at,
    });

    try {
        const community = await Community.findById(id);
        community.comments.push(commented.id);
        community.save();
        res.status(201).send(commented);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = commentCreate;
