import Station from '../../model/station';
import dotenv from 'dotenv';
import request from 'request';
import { ObjectID } from 'mongodb';

dotenv.config();

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
