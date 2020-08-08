import Community from '../../model/community';
import { ObjectID } from 'mongodb';

/**
 * @api {get} /community/id
 * @apiDescription 해당 커뮤니티 게시글을 요청합니다.
 * @apiName 해당 커뮤니티 게시글 요청
 * @apiGroup community
 *
 * @param {id} communityId req
 *
 * @apiSuccess {Number} 200 해당 커뮤니티 게시글 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *    [
 *        {
 *            "_id": "5f293b7505133c3b05fc4fde",
 *            "view": 0,
 *            "userId": '123782317823',
 *            "name": "이유정",
 *            "title": "저의 첫 번째 여행입니다",
 *            "imageURL": "http://aws~.png"
 *            "article": "매우 재미있었습니다",
 *            "createdAt": "2020-08-04",
 *            "updatedAt": "2020-08-04"
 *        }
 *    ]
 *
 * @apiError {Number} 500 해당 커뮤니티 게시글 요청 실패
 */

const postView = async (req, res) => {
    const { id } = req.params;

    try {
        const view = await Community.findOne({ _id: id });

        if (view) {
            view.view++;
            view.save();
        }
        if (view.imageURL) {
            const postView = await Community.aggregate([
                { $match: { _id: ObjectID(id) } },
                {
                    $project: {
                        view: 1,
                        _id: 1,
                        userId: 1,
                        name: 1,
                        title: 1,
                        imageURL: 1,
                        article: 1,
                        createdAt: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$createdAt',
                                timezone: 'Japan',
                            },
                        },
                        updatedAt: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$updatedAt',
                                timezone: 'Japan',
                            },
                        },
                    },
                },
            ]);
            res.status(200).send(postView);
        } else {
            const postView = await Community.aggregate([
                { $match: { _id: ObjectID(id) } },
                {
                    $project: {
                        view: 1,
                        _id: 1,
                        userId: 1,
                        name: 1,
                        title: 1,
                        article: 1,
                        createdAt: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$createdAt',
                                timezone: 'Japan',
                            },
                        },
                        updatedAt: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$updatedAt',
                                timezone: 'Japan',
                            },
                        },
                    },
                },
            ]);
            res.status(200).send(postView);
        }
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default postView;
