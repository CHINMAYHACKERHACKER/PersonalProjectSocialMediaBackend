const signUpModel = require("../model/signUpModel.js");

exports.getChatUserFriends = async (req, res) => {
    try {
        let { body: { userId, page_number, page_size } } = req;
        let skip = (page_number - 1) * page_size;
        let chatUserFriendRes = await signUpModel.findById(userId).populate({
            path: "friends",
            select: "email_mobile_number Image",
            options: {
                skip: skip,
                limit: page_size
            }
        }).lean();
        if (!chatUserFriendRes) {
            return res.status(404).json({ message: "User not found" });
        }
        let finalRes = chatUserFriendRes.friends;
        return res.status(200).json({ message: "List Fetched SucessFully", finalRes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}