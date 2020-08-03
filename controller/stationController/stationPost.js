import Station from '../../model/station';

const stationPost = async (req, res) => {
    try {
        const stations = new Station({
            station,
            stationNumber,
            stationInfo,
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
