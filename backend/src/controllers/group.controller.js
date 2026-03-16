const Group = require("../models/Group.js");


// Create group
exports.createGroup = async (req, res) => {
    try {

        const { name, members } = req.body;

        const group = await Group.create({
            name,
            createdBy: req.user._id,
            members: [req.user._id, ...(members || [])]
        });

        res.status(201).json({
            success: true,
            data: group
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Get all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({})
            .populate("members", "name email");

        res.status(200).json({
            success: true,
            data: groups
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get single group
exports.getGroupById = async (req, res) => {
    try {

        const group = await Group.findById(req.params.id)
            .populate("members", "name email");

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        res.status(200).json({
            success: true,
            data: group
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// Join group
exports.joinGroup = async (req, res) => {
    try {

        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({
                success: false,
                message: "Group not found"
            });
        }

        if (!group.members.includes(req.user._id)) {
            group.members.push(req.user._id);
            await group.save();
        }

        res.status(200).json({
            success: true,
            data: group
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};