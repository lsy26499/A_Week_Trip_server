import Station from '../../model/station';
import dotenv from 'dotenv';
import request from 'request';
import { ObjectID } from 'mongodb';
dotenv.config();

/**
 * @api {get} /station 기차역 정보 요청
 * @apiDescription 기차역 정보를 요청합니다.
 * @apiName 기차역 정보 요청
 * @apiGroup station
 *
 * @apiSuccess {Number} 200 기차역 정보 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *   [
 *        {
 *            "stationDeatil": [
 *               {
 *                    "_id": "5f237bef2431a1087056eca5",
 *                    "station": "서울역",
 *                    "stationNumber": 1,
 *                    "info": "서울의 중심지입니다.",
 *                    "lodging": [
 *                        {
 *                            "name": "1호점",
 *                            "phone": "010-444-4444",
 *                            "address": "서울시 종로구",
 *                            "info": "좋은곳입니다."
 *                        }
 *                    ],
 *                    "tourism": [
 *                        {
 *                            "name": "인사동",
 *                            "phone": "010-333-3334",
 *                            "address": "인사동 어디엔가",
 *                            "info": "문화를 느낄 수 있는 인사동입니다."
 *                        }
 *                    ],
 *                    "food": [
 *                        {
 *                            "name": "닭한마리",
 *                            "phone": "010-555-5555",
 *                            "address": "종로5가 닭한마리 골목",
 *                            "info": "원조가 100군데"
 *                        }
 *                    ],
 *                    "lon": 35,
 *                    "lat": 129
 *                }
 *            ],
 *            "weather": "http://openweathermap.org/img/wn/04n@2x.png"
 *        }
 *  ]
 * @apiError {Number} 500 기차역 정보 요청 실패
 */

// 외부 API 받는 함수
const weatherIcon = (lat, lon, callback) => {
    request(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=` +
            process.env.WEATHER_API_KEY,
        async function (err, response, body) {
            if (err) console.log(err);
            else {
                let obj = await JSON.parse(body);
                callback(obj);
            }
        }
    );
};

//GET
const stationDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const stationDetail = await Station.aggregate([
            {
                $match: { _id: ObjectID(id) },
            },
            {
                $project: {
                    _id: 1,
                    station: 1,
                    stationNumber: 1,
                    info: 1,
                    lodging: 1,
                    tourism: 1,
                    food: 1,
                    lon: { $arrayElemAt: ['$coord', 0] },
                    lat: { $arrayElemAt: ['$coord', 1] },
                },
            },
        ]);
        const { lon, lat } = stationDetail[0];

        if (!stationDetail || !id) {
            res.status(404).send('404 Not found');
            return;
        }
        // 외부 API
        weatherIcon(lon, lat, async (data) => {
            const icon = await data.weather[0].icon;
            console.log(icon);
            await res.status(200).send({
                stationDeatil: stationDetail,
                weather: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            });
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        //외부 API 호출을 할 땐... res.end()를 쓰지 말아주세요...
        //res.end();
    }
};

module.exports = stationDetail;
