const signUpModel = require("../model/signUpModel.js");

exports.getSearchFriendList = async (req, res) => {
    try {
        const { body: { userId, page_number, page_size } } = req
        let skip = (page_number - 1) * page_size
        let friendrequest = await signUpModel.findOne({ _id: userId });
        let friends = friendrequest.friends;
        let friendSentRequest = friendrequest.friendSentRequest;
        signUpModel.find({
            $and: [
                { _id: { $ne: userId } },
                { _id: { $nin: friends } },
                { _id: { $nin: friendSentRequest}}
            ]
        }).select('-password').skip(skip).limit(page_size).then((friendList) => {
            if (friendList && friendList.length) {
                return res.status(200).json({ message: "Friends list fetched successfully", friendList });
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