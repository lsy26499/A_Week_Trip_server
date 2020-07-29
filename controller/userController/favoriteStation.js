//task가 없는 mini project이기 때문에 한 페이지에서 진행
import User from '../../model/user';
import { ObjectID } from 'mongodb';

//TODO: userId 구현이 되면 params로 받던 id를 정리하고 진짜 userId 데이터로 리팩토링을 해 주세요.

/**
 * * '/favStation/:userId/:stationId'
 * @param {userId} userId req
 * @param {stationId} stationId req
 */
//put 즐겨찾기 추가 / 삭제
export const favStations = async (req, res) => {
    const { userId, stationId } = req.params;

    try {
        if (await User.findOne({ userId: userId, favStation: stationId })) {
            //아이디가 있으면?
            console.log('아이디가 있습니다. 아이디를 삭제합니다.');
            await User.update(
                { userId: userId, favStation: stationId },
                {
                    $pull: { favStation: ObjectID(stationId) },
                },
                { new: true }
            );
        } else {
            //아이디가 없으면?
            console.log('아이디가 없습니다. 아이디를 추가합니다.');
            await User.update(
                { userId: userId },
                {
                    $push: { favStation: ObjectID(stationId) },
                },
                { new: true }
            );
        }
        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};

/**
 * * '/favStationList/:id'
 * @param {id} userId req
 */
//get 불러오기
export const favStationsList = async (req, res) => {
    const { id } = req.params;

    try {
        const favStationList = await User.findOne(
            { userId: id },
            { favStation: true, _id: false }
        )
            .populate('favStation')
            .exec();
        res.status(200).send(favStationList);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    } finally {
        res.end();
    }
};
