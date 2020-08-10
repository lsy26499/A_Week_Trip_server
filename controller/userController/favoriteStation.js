//task가 없는 mini project이기 때문에 한 페이지에서 진행
import User from '../../model/user';
import { ObjectID } from 'mongodb';

/**
 * @api {put} /user/favStation/:stationId
 * @apiDescription 즐겨찾기에 역을 삽입 / 삭제합니다.
 * @apiName 역 즐겨찾기
 * @apiGroup user
 *
 * @param {stationId} stationId req
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 201 즐겨찾기 삽입 / 삭제 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 * {
 *     "userId": "573361953345860",
 *     "name": "이유정",
 *     "_id": "5f2949193095de40cb811123",
 *     "favStation": ["5f2949193095de40cb811123"],
 *     "scrapPosts": []
 * }
 * ! 이런 식으로 데이터가 전송이 되지만 클라이언트가 받는 send는 메시지뿐입니다.
 * @apiError {Number} 500 즐겨찾기 삽입 / 삭제 실패
 */

export const favStations = async (req, res) => {
    const { stationId } = req.params;
    const { userId } = req.user;

    try {
        const userFav = await User.findOne({
            userId: userId,
            favStation: stationId,
        });
        if (userFav) {
            await User.update(
                { userId: userId, favStation: stationId },
                {
                    $pull: { favStation: ObjectID(stationId) },
                },
                { new: true }
            );
        } else {
            await User.update(
                { userId: userId },
                {
                    $push: { favStation: ObjectID(stationId) },
                },
                { new: true }
            );
        }
        res.status(201).send('정상적으로 처리되었습니다.');
    } catch (error) {
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

/**
 * @api {get} /user/favStationList
 * @apiDescription 즐겨찾기에 역을 요청합니다.
 * @apiName 역 즐겨찾기 요청
 * @apiGroup user
 *
 * @user {userId} userId req
 *
 * @apiSuccess {Number} 200 즐겨찾기 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 201
 *    {
 *        "favStation": [
 *            {
 *                "coord": [
 *                    37.814515,
 *                    127.510693
 *                ],
 *                "_id": "5f294e35ff2ecf2cad5e2655",
 *                "station": "가평역",
 *                "info": ""
 *            },
 *            {
 *                "coord": [
 *                    37.81,
 *                    127.51
 *                ],
 *                "_id": "5f294ec2ff2ecf2cad5e2657",
 *                "station": "가평역",
 *                "info": ""
 *            }
 *        ]
 *    }
 * @apiError {Number} 500 즐겨찾기 요청 실패
 */
export const favStationsList = async (req, res) => {
    const { userId } = req.user;

    try {
        const favStationList = await User.findOne(
            { userId: userId },
            { favStation: true, _id: false }
        )
            .populate('favStation')
            .exec();
        res.status(200).send(favStationList);
    } catch (error) {
        res.status(500).send(error);
    } finally {
        res.end();
    }
};
