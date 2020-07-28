import User from '../../model/user';

/**
 *
 * @param {id} req userId
 *
 */

//TODO: userId 구현이 되면 params로 받던 id를 정리하고 진짜 userId 데이터로 리팩토링을 해 주세요.

const scrapList = async (req, res) => {
    const { id } = req.params;

    try {
        const scrapList = await User.findOne(
            { userId: id },
            { scrapPosts: true, _id: false }
        )
            .populate('scrapPosts')
            .exec();
        res.status(200).send(scrapList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

module.exports = scrapList;
