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
        res.send(postList);
    } catch (err) {
        res.send('Not Found');
    }
};

export default postList;
