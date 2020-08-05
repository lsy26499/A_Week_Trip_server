import User from '../../model/user';

const logout = async (req, res) => {
    const { _id } = req.user;

    const deleteToken = { jsonWebToken: '' };
    try {
        const user = await User.findByIdAndUpdate(_id, deleteToken, {
            new: true,
        });
        console.log(user);
        res.status(201).send('로그아웃이 정상적으로 처리되었습니다.');
    } catch (err) {
        console.log(err);
    } finally {
        res.end();
    }
};

export default logout;
