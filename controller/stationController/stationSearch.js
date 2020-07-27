import Station from '../../model/station';

const stationSearch = async (req, res) => {
    const { content } = req.query;
    try {
        const station = await Station.find({ station: new RegExp(content) });
        res.status(200).send(station);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = stationSearch;
