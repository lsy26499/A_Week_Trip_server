import User from '../../model/user';
import { ObjectID } from 'mongodb';

const scrap = async (req, res) => {
    /*
     * 프론트엔드: 게시글에 스크랩 버튼을 만들어 놓음
     * 그걸 클릭하면 communityID가 API로 전송
     * 해당 유저의 postScrap 필드에 communityID 추가 혹은 삭제
     * (만약에 postScrap 필드에 있는 communityID가 없다면 추가 있다면 삭제)
     * 커뮤니티 게시글이 삭제되면? => 삭제하는 API에 User.postScrap 안의 communityID도 삭제
     */

    /**
     * @params {userId} 현재 userID // jwt user로 바뀔 가능성 다분
     * @params {communityId} user 스키마 안의 communityID
     */

    //TODO: user 구현이 되면 진짜 user로 치환 (params로 받지 않을 수도 있음.)
    const { userId, communityId } = req.params;
    try {
        //유저 확인
        const user = await User.findOne({ userId: userId });

        //만약에 유저 안의 scrapPosts에 커뮤니티 아이디가 있으면?
        if (await User.findOne({ userId: userId, scrapPosts: communityId })) {
            user.scrapPosts.pop({ _id: ObjectID(communityId) });
            user.save();
            //커뮤니티 아이디가 없으면?
        } else {
            user.scrapPosts.push({ _id: ObjectID(communityId) });
            user.save();
        }
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

module.exports = scrap;
