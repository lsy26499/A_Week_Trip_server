import Station from '../../model/station';

/**
 * @api {get} /station/search
 * @apiDescription 검색된 기차역 정보를 요청합니다.
 * @apiName 기차역 검색
 * @apiGroup station
 *
 * @query {contnet} /station/search/?contnet=서
 *
 * @apiSuccess {Number} 200 검색된 기차역 정보 요청 성공
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
 *      "station": "서대전",
 *      "stationNumber": 22
 *  }
 *
 * @apiError {Number} 500 검색된 기차역 정보 요청 실패
 */

const stationSearch = async (req, res) => {
    const { content } = req.query;
    try {
        const station = await Station.find(
            { station: new RegExp(content) },
            {
                _id: 1,
                station: 1,
                stationNumber: 1,
            }
        );
        res.status(200).send(station);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = stationSearch;
