import Community from '../../model/community';
import dayjs from 'dayjs';

const postCreate = async (req, res) => {
    const { userId, name, title, article, create_at } = req.body;
    console.log(req.body);
    console.log(userId, name, title, article);
    const postCreate = new Community({
        userId,
        name,
        title,
        article,
        create_at,
        comments: [],
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
