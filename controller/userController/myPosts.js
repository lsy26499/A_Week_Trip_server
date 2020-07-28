import Community from '../../model/community';

/**
 * @param { id } req
 *  params가 ID로 들어가지 않을 수도 있음.
 * UserID 안의 Array가 들어가는 방식이라면 수정될 수 있음.
 *  params로 받지 않고 해당 유저의 posts로 조회 가능.
 * (인증 정보를 가지고?)
 */

// GET
const myPosts = async (req, res) => {
    //TODO: 진짜 userID가 들어가게 된다면 그것으로 치환.

    const { id } = req.params;

    try {
        const myPosts = await Community.find({ userId: id }).sort({
            postNumber: -1,
        });
        res.status(200).send(myPosts);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = myPosts;
