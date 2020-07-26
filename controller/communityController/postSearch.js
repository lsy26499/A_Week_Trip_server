import Community from '../../model/community';

const postSearch = async (req, res) => {
    const { content } = req.query;
    let options = [
        { title: new RegExp(content) },
        { article: new RegExp(content) },
    ];
    try {
        const community = await Community.find({ $or: options });
        if (!community) {
            console.log('검색 옵션이 없습니다.');
            res.status(400).send('검색 옵션이 없습니다.');
        }
        res.status(200).send(community);
    } catch (err) {
        res.status(500).send(err);
    }
};

export default postSearch;
