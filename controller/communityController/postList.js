import Community from '../../model/community';

const postList = async (req, res) => {
    try {
        const postList = await Community.find(
            {},
            {
                _id: true,
                userId: true,
                name: true,
                postNumber: true,
                title: true,
            }
        ).sort({ postNumber: -1 });
        res.status(200).send(postList);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postList;
