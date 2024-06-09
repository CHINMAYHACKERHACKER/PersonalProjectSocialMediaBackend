const signUpModel = require("../model/signUpModel.js");
exports.friendRequest = async (req, res) => {
    try {
        const { body: { currentUserId, selectedUserId, friendButton } } = req;
        await signUpModel.findByIdAndUpdate(selectedUserId, {
            $push: { friendRequest: currentUserId }
        })

        await signUpModel.findByIdAndUpdate(currentUserId, {
            $push: { friendSentRequest: selectedUserId }
        })
        return res.status(200).json({ message: "Sent Friend Request" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getFriendRequest = async (req, res) => {
    try {
        const { body: { userId } } = req;
        let getFriendRequestRes = await signUpModel.findById(userId).populate({
            path: "friendRequest",
            select: "email_mobile_number Image"
        }).lean();
        let finalRes = getFriendRequestRes.friendRequest
        return res.status(200).json({ message: "List Fetched SucessFully", finalRes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.friendRequestAccept = async (req, res) => {
    try {
        const { body: { senderId, recpientId } } = req;
        let sender = await signUpModel.findById(senderId);
        let recpient = await signUpModel.findById(recpientId);

        sender.friends.push(recpientId);
        recpient.friends.push(senderId);

        recpient.friendRequest.pull(senderId);
        sender.friendSentRequest.pull(recpientId);

        await sender.save();
        await recpient.save();
        return res.status(200).json({ message: "Friend Request Accepte SucessFully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}