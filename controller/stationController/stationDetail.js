import Station from '../../model/station';
import dotenv from 'dotenv';
import request from 'request';
import cheerio from 'cheerio';

import { ObjectID } from 'mongodb';
dotenv.config();

/**
 * @api {get} /station/id
 *
 * @param {id} stationId req
 *
 * @apiDescription 해당 역 상세 정보 리스트를 요청합니다.
 * @apiName 해당 역 상세 정보 리스트 요청
 * @apiGroup station
 *
 * @apiSuccess {Number} 200 해당 역 상세 정보 리스트 요청 성공
 * @apiSuccessExample {json} Success-Response:
 *       HTTP/1.1 200
 *    [
 *        {
 *            "stationDeatil": [
 *                {
 *                    "_id": "5f294ea7ff2ecf2cad5e2656",
 *                    "station": "가평역",
 *                    "info": "가평역입니다.",
 *                    "lon": 37.814515,
 *                    "lat": 127.510693
 *                }
 *            ],
 *            "weather": "http://openweathermap.org/img/wn/10n@2x.png",
 *            "lodging": [...],
 *            "tourism": [...],
 *            "food": [...]
 *        }
 *    ]
 *
 * @apiError {Number} 500 해당 역 상세 정보 리스트 요청 실패
 */

// 날씨 API
const weatherIcon = (lat, lon) => {
    return new Promise((resolve) => {
        request(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=` +
                process.env.WEATHER_API_KEY,
            async function (err, response, body) {
                if (err) console.log(err);
                else {
                    let obj = await JSON.parse(body);
                    const icon = await obj.weather[0].icon;
                    resolve(icon);
                }
            }
        );
    });
};

// 웹 크롤링
const getInfo = (region, subject) => {
    try {
        let ulList = [];
        return new Promise((resolve) => {
            request(
                `https://search.naver.com/search.naver?where=post&sm=tab_jum&query=${encodeURIComponent(
                    region
                )}+${encodeURIComponent(subject)}`,
                (err, res, body) => {
                    if (err) console.log(err);
                    else {
                        const $ = cheerio.load(body);
                        const $bodyList = $('ul.type01')
                            .children('li.sh_blog_top')
                            .slice(0, 5);

                        $bodyList.each(function (i, elem) {
                            ulList[i] = {
                                title: $(this).find('dl dt a').text(),
                                blogName: $(this)
                                    .find('span.inline a.txt84')
                                    .slice(0, 1)
                                    .text(),
                                description: $(this)
                                    .find('dd.sh_blog_passage')
                                    .text(),
                                date: $(this).find('dd.txt_inline').text(),
                                href: $(this).find('dl dt a').attr('href'),
                                thumb: $(this)
                                    .find('img.sh_blog_thumbnail')
                                    .attr('src'),
                            };
                        });

                        const data = ulList.filter((n) => n.title);
                        resolve(data);
                    }
                }
            );
        });
    } catch (err) {
        console.log(err);
    }
};

export const stationDetail = async (req, res) => {
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
                    lon: { $arrayElemAt: ['$coord', 0] },
                    lat: { $arrayElemAt: ['$coord', 1] },
                },
            },
        ]);
        const { lon, lat, station } = stationDetail[0];

        const icon = await weatherIcon(lon, lat);
        const tourism = await getInfo(station, '볼거리');
        const food = await getInfo(station, '맛집');
        const lodging = await getInfo(station, '숙소+추천');

        if (!stationDetail || !id) {
            res.status(404).send('404 Not found');
            return;
        }
        res.status(200).send({
            stationDeatil: stationDetail,
            weather: `http://openweathermap.org/img/wn/${icon}@2x.png`,
            lodging: lodging,
            tourism: tourism,
            food: food,
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        res.end();
    }
};

//추천 지역 랜덤
export const stationRandomDetail = async (req, res) => {
    try {
        const stationDetail = await Station.aggregate([
            {
                $sample: { size: 5 },
            },
            {
                $project: {
                    id: '$_id',
                    _id: 0,
                    region: '$station',
                },
            },
        ]);

        res.status(200).send(stationDetail);
    } catch (err) {
        console.log(err);
        res.send(err);
    } finally {
        res.end();
    }
};
