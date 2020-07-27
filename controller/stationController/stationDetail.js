import Station from '../../model/station';
import dotenv from 'dotenv';
import request from 'request';

dotenv.config();

// 외부 API 받는 함수
const weatherIcon = (lat, lon, callback) => {
    request(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=` +
            process.env.WEATHER_API_KEY,
        function (err, res, body) {
            if (err) console.log(err);
            else {
                let obj = JSON.parse(body);
                callback(obj);
            }
        }
    );
};

//GET
const stationDetail = async (req, res) => {
    const { id } = req.params;

    try {
        const stationDetail = await Station.find({ _id: id });
        if (!stationDetail || !id) {
            res.status(404).send('404 Not found');
            return;
        }
        const { lon, lat } = await stationDetail[0].coord;

        // 외부 API
        weatherIcon(lon, lat, (data) => {
            const icon = await data.weather[0].icon;

            res.status(200).send({
                stationDeatil: stationDetail,
                weather: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            });
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        res.end();
    }
};

module.exports = stationDetail;
