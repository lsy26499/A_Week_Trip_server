import User from '../../model/user';

const logout = async (req, res) => {
    const { _id } = req.user;

    const deleteToken = { jsonWebToken: '' };
    try {
        await User.findByIdAndUpdate(_id, deleteToken, {
            new: true,
        });
        res.status(201).send('로그아웃이 정상적으로 처리되었습니다.');
    } catch (err) {
        res.status(500).send(err);
    } finally {
        res.end();
    }
};

export default logout;
