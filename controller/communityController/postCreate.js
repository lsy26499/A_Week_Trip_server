import Community from '../../model/community';

const postCreate = async (req, res) => {
    const { userId, name, title, article } = req.body;
    const postCreate = new Community({
        userId,
        name,
        title,
        article,
    });
    try {
        if (userId) {
            const newPost = await postCreate.save();
            res.status(200).send(newPost);
        } else res.status(400).send('Create Failed');
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postCreate;
