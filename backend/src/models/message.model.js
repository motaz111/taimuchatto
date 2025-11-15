import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true } 
);

messageSchema.pre("validate", function (next) {
	if (!this.text && !this.image) {
		return next(new Error("Message must have either text or an image."));
	}
	next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;