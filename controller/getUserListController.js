const signUpModel = require("../model/signUpModel.js");
exports.getUserList = async (req, res) => {
    try {
        const { body: { userId, page_number, page_size } } = req
        let skip = (page_number - 1) * page_size;
        let friendrequest = await signUpModel.findOne({ _id: userId });
        let friendRequest = friendrequest.friendRequest;
        let friendSentRequest = friendrequest.friendSentRequest;
        let friends = friendrequest.friends;
        signUpModel.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: friendRequest } },
                { _id: { $nin: friendSentRequest } },
                { _id: { $nin: friends } }
            ]
        }).select('-password').skip(skip).limit(page_size).then((userList) => {
            if (userList && userList.length) {
                return res.status(200).json({ message: "User list fetched successfully", userList });
            }
            else {
                return res.status(204).json({ message: "Unsucess" });
            }
        }).catch((err) => {
            return null;
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}