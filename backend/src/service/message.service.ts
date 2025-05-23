import Message from '../model/message.model';
import User from '../model/user.model';
import Chat from '../model/chat.model';

export const createMessage = async(content: string, chatId: string, userId: string) => {
    const newMessage = {
        sender: userId,
        content: content,
        chat: chatId
    }

    try {
        let message: any = await Message.create(newMessage);

        message = await message.populate("sender", "username email");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "users",
            select: "username email"
        });

        if (!message) {
            throw new Error("Message not found after creation");
        }

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        });

        return message;
    } catch (error: any) {
        throw new Error("Error creating message");
    }
}

export const getAllMessages = async(chatId: string) => {
    try {
        const messages = await Message.find({chat:chatId})
            .populate("sender", "username email")
            .populate("chat");
        
        return messages;
    } catch (error: any) {
        throw new Error('Error fetching messages')
    }
}