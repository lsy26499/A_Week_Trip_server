import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        res.status(400).send('잘못된 Objcet Id입니다.');
        return;
    }
    return next();
};
