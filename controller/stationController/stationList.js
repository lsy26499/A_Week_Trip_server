import Station from '../../model/station';

/**
 * @api {get} /station
 * @apiDescription 역 정보 리스트를 요청합니다.
 * @apiName 역 정보 리스트 요청
 * @apiGroup station
 *
 * @apiSuccess {Number} 200 역 정보 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *
 *  {
 *      "_id": "5f237bef2431a1087056eca5",
 *      "station": "서울역",
 *      "stationNumber": 1
 *  },
 *  {
 *      "_id": "5f237bef2431a1087056eca6",
 *      "station": "용산역",
 *      "stationNumber": 2
 *  }
 *
 * @apiError {Number} 500 역 정보 리스트 요청 실패
 */

const stationList = async (req, res) => {
    try {
        const stationList = await Station.find(
            {},
            { _id: true, station: true, stationNumber: true }
        ).sort({ stationNumber: 1 });
        res.status(200).send(stationList);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = stationList;
