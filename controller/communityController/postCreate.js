import Community from '../../model/community';

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * ! body안에 file이 있는 게 아니라 file이 따로 있는 거예요!
 * ! file.path로 path를 불러올 수 있습니다. (S3에 저장할 땐 location입니다.)
 * ! multer에서 지정해 준 이미지 문자열은 uploads 파일에 저장됩니다.
 * ! 이미지는 1 장만 가능합니다.
 */
const postCreate = async (req, res) => {
    const {
        body: { userId, name, title, article },
        file: { location }, //!현재 S3 기준으로 코딩 중입니다.
    } = req;
    const postCreate = new Community({
        userId,
        name,
        title,
        article,
        imageURL: location,
    });
    try {
        if (userId) {
            const newPost = await postCreate.save();
            res.status(200).send(newPost);
        } else res.status(400).send('Create Failed');
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default postCreate;
