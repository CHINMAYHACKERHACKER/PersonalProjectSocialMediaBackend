exports.userHomePage = (req, res) => {
    let { accessToken } = req;
    try {
      return  res.status(200).json({ valid: true, accessToken: accessToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}