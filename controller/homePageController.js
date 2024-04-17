exports.userHomePage = (req, res) => {
    let { accessToken } = req;
    res.status(200).json({ valid: true, accessToken: accessToken });
}