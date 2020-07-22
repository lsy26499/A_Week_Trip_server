import Station from '../../model/station';

const stationList = async (req, res) => {
    try {
        const stationList = await Station.find(
            {},
            { _id: true, station: true, stationNumber: true }
        ).sort({ stationNumber: 1 });
        res.send(stationList);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

module.exports = stationList;
