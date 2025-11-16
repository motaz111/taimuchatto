import User from "../models/user.model.js";
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";

// Get users for sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        const LoggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: LoggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get messages between two users
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Send a message to a user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            try {
                // Validate that the image is in a proper format (data URL)
                if (!image.startsWith('data:image/')) {
                    return res.status(400).json({ error: "Invalid image format" });
                }

                // Upload base64 image to cloudinary
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError.message);

                // If Cloudinary upload fails due to credentials, fallback to storing base64 for development
                if (uploadError.message.includes("Must supply cloud_name") ||
                    uploadError.message.includes("api_key")) {
                    console.log("Cloudinary not configured, storing image as base64 for development");
                    // In development mode, store the base64 image directly
                    imageUrl = image;
                } else {
                    return res.status(500).json({ error: "Failed to upload image" });
                }
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // Emit the message to the recipient in real-time via Socket.IO
        const { emitToUser } = await import('../store/socketStore.js');
        emitToUser(receiverId, "newMessage", newMessage);

        res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}