const signUpModel = require("../model/signUpModel.js");
exports.unFriend = async (req, res) => {
    try {
        let { body: { userId, unFriendId } } = req;
        let unFriendRes = await signUpModel.findByIdAndUpdate(userId, {
            $pull: { friends: unFriendId }
        })
        let unFriend = await signUpModel.findByIdAndUpdate(unFriendId, {
            $pull: { friends: userId }
        })
        await unFriendRes.save();
        await unFriend.save();
        if (unFriendRes) {
            return res.status(200).json({ message: "unFriend Sucessfully" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}