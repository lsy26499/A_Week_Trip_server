import Station from '../../model/station';

// station Post는 더미 데이터용 API이기 때문에 DOCS가 없습니다.

const stationPost = async (req, res) => {
    try {
        const stations = new Station({
            station,
            coord,
        }).save();
        res.status(201).send(stations);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = stationPost;
