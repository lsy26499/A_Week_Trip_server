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
    //? 글을 생성했을 때 넣어 주는 게 좋을까? 아니면 api를 호출했을 때 커뮤니티를 검색하는 게 좋을까?
    //? 일단은 후자입니다만 추후에 효율을 고려해서 다시 바뀔 수 있습니다.

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
