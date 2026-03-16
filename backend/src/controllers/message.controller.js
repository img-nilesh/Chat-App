const Message = require("../models/Message");


// Get private chat messages
exports.getPrivateMessages = async (req, res) => {
    try {

        const currentUserId = req.user._id;
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            type: "private",
            $or: [
                { sender: currentUserId, receiver: otherUserId },
                { sender: otherUserId, receiver: currentUserId }
            ]
        })
            .sort({ createdAt: 1 })
            .populate("sender", "name");

        res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};



// Get group chat messages
exports.getGroupMessages = async (req, res) => {
    try {

        const groupId = req.params.groupId;

        const messages = await Message.find({
            type: "group",
            group: groupId
        })
            .sort({ createdAt: 1 })
            .populate("sender", "name");

        res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};