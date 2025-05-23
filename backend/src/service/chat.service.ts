import Chat from '../model/chat.model';

export const accessChat = async(userId: string, user: any) => {

    let existingChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
            ],
        })
        .populate("users", "-password")
        .populate("latestMessage");

    existingChat = await Chat.populate(existingChat,{
        path: "latestMessage.sender",
        select: "username email"
    });

    if (existingChat.length > 0){
        return (existingChat[0]);
    }
    else{
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const fullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            );

            return fullChat;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export const fetchChats = async(user: any) => {

    let chats = await Chat.find({
        users:{ $elemMatch:{ $eq: user._id }}
    })
    .populate("users", "-password")
    .populate("latestMessage");

    chats = await Chat.populate(chats,{
        path: "latestMessage.sender",
        select: "username email"
    });

    return chats;
}