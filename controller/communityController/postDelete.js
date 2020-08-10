import Post from '../../model/community';
import User from '../../model/user';
import { ObjectID } from 'mongodb';

import s3 from 'multer-s3';
import aws from 'aws-sdk';

/**
 * @api {delete} /community/id
 * @apiDescription 해당 게시글을 삭제합니다.
 * @apiName 게시글 삭제
 * @apiGroup community
 *
 * @param {id} commentId req
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 게시글 삭제 성공
 *
 *  {
 *    "성공적으로 게시글이 삭제되었습니다."
 *  }
 *
 * @apiError {Number} 500 게시글 삭제 실패
 */

const postDelete = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    const s3 = new aws.S3({
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        accessKeyId: process.env.ACCESS_KEY_ID,
        region: 'ap-northeast-1',
    });

    try {
        const image = await Post.findById(id, { key: 1 });

        if (image) {
            const params = {
                Bucket: 'awt-image',
                Delete: {
                    Objects: [
                        {
                            Key: image.key,
                        },
                    ],
                },
            };

            s3.deleteObjects(params, (err, data) => {
                if (err) console.log(err, err.stack);
                else {
                    console.log(data);
                }
            });
        }

        await Post.findByIdAndRemove(id);
        const user = await User.find({
            scrapPosts: ObjectID(id),
            userId: userId,
        });

        if (user) {
            await User.updateMany(
                { scrapPosts: ObjectID(id) },
                {
                    $pull: { scrapPosts: ObjectID(id) },
                },
                { new: true }
            );
        }
        res.status(200).send('성공적으로 게시글이 삭제되었습니다.');
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = postDelete;
