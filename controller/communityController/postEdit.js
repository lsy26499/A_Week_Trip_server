import Post from '../../model/community';

/**
 * @api {put} /community
 * @apiDescription 기존의 게시글을 수정합니다.
 * @apiName 게시글 수정
 * @apiGroup community
 *
 * @param {_id} mongoDB.ObjectID req
 * @body req
 *
 * @apiSuccess {Number} 201 게시글 수정 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *    [
 *        {
 *            "_id": "5f293b7505133c3b05fc4fde",
 *            "view": 0,
 *            "userId": '123782317823',
 *            "name": "이유정",
 *            "title": "저의 첫 번째 여행입니다",
 *            "article": "매우 재미있었습니다만 수정합니다 매우 재미있었습니다",
 *            "createdAt": "2020-08-04",
 *            "updatedAt": "2020-08-04"
 *        }
 *    ]
 *
 * @apiError {Number} 404 게시글이 없음
 * @apiError {Number} 500 게시글 수정 실패
 */

const postEdit = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!post) {
            res.status(404);
            return;
        }

        req.body = post;
        res.status(201).send(post);
    } catch (err) {
        console.log(err);
    } finally {
        res.end();
    }
};

module.exports = postEdit;
