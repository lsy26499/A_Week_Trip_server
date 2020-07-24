import Community from '../../model/community';

const postView = async (req, res) => {
    const { _id } = req.params;
    try {
        const postView = await Community.find(
            { _id: _id },
            {
                _id: true,
                userId: true,
                name: true,
                title: true,
                article: true,
                comments: true,
                created_at: true,
            }
        );
        res.status(200).send(postView);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postView;
