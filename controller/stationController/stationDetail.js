import Station from '../../model/station';

const stationDetail = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const stationDetail = await Station.find({ _id: id });
        if (!stationDetail || !id) {
            res.status(404).send('404 Not found');
            return;
        }
        res.send(stationDetail);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
};

module.exports = stationDetail;
