import Station from '../../model/station';

// station Post는 더미 데이터용 API이기 때문에 DOCS가 없습니다.

const stationPost = async (req, res) => {
    const { station, coord } = req.body;
    const stations = new Station({
        station,
        coord,
    });
    try {
        const newStations = await stations.save();
        res.status(201).send(newStations);
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

module.exports = stationPost;
