import Community from '../../model/community';

/**
 * @api {post} /community
 * @apiDescription 새로운 게시글을 생성합니다.
 * @apiName 게시글 생성
 * @apiGroup community
 *
 * @body {userId, name, title, article, imageURL} req
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
 *      "updatedAt": 2020-07-28T11:22:45.401+00:00,
 *      "imageURL": "http://aws~.png"
 *  }
 * @apiError {Number} 400 생성할 게시글 내용이 없음
 * @apiError {Number} 500 게시글 생성 실패
 */

const postCreate = async (req, res) => {
    try {
        const {
            body: { userId, name, title, article },
        } = req;

        if (req.file) {
            const { location, key } = req.file;

            const postCreateWithImage = new Community({
                userId,
                name,
                title,
                article,
                imageURL: location,
                key: key,
            });
            if (userId) {
                const newPost = await postCreateWithImage.save();
                res.status(200).send(newPost);
            } else res.status(400).send('Create Failed');
        } else {
            const postCreate = new Community({
                userId,
                name,
                title,
                article,
            });
            if (userId) {
                const newPost = await postCreate.save();
                res.status(200).send(newPost);
            } else res.status(400).send('Create Failed');
        }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default postCreate;
