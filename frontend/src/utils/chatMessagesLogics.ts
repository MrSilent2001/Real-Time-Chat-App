export const isSameSender = (chatMessages, msg, index, userId) => {
  return (
    index < chatMessages.length - 1 &&
    (chatMessages[index + 1].sender._id !== msg.sender._id ||
      chatMessages[index + 1].sender._id === undefined) &&
    chatMessages[index].sender._id !== userId
  );
};

export const isLastMessage = (chatMessages, index, userId) => {
  return (
    index === chatMessages.length - 1 &&
    chatMessages[chatMessages.length - 1].sender._id !== userId &&
    chatMessages[chatMessages.length - 1].sender._id
  );
};
