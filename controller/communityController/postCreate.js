import Community from '../../model/community';

/**
 * ! body안에 file이 있는 게 아니라 file이 따로 있는 거예요!
 * ! file.path로 path를 불러올 수 있습니다. (S3에 저장할 땐 location입니다.)
 * ! multer에서 지정해 준 이미지 문자열은 uploads 파일에 저장됩니다.
 * ! 이미지는 1 장만 가능합니다.
 */

/**
 * @api {post} /community
 * @apiDescription 새로운 게시글을 생성합니다.
 * @apiName 게시글 생성
 * @apiGroup community
 *
 * @body {userId, name, title, article} req
 *
 * @apiSuccess {Number} 201 게시글 생성 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *  {
 *      "userId": 1,
 *      "name": "이유정",
 *      "title": "게시글입니다.",
 *      "article": "첫 번째 게시글입니다.",
 *      "createdAt": 2020-07-28T11:22:45.401+00:00,
 *      "updatedAt": 2020-07-28T11:22:45.401+00:00
 *  }
 * @apiError {Number} 400 생성할 게시글 내용이 없음
 * @apiError {Number} 500 게시글 생성 실패
 */

const postCreate = async (req, res) => {
    const {
        body: { userId, name, title, article },
        file: { location },
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
