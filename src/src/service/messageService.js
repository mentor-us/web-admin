import MessageApi from "api/MessageApi";

import ErrorWrapper from "./ErrorServiceWrapper";

const getMessages = async (userId, groupId, page = 0, size = 25) => {
  try {
    const data = await MessageApi.getMessages(groupId, page, size);
    if (data && data.length) {
      return data.map((message) => {
        if (message.type !== "TASK") {
          return message;
        }

        const { task } = message;
        if (!task) {
          return message;
        }

        const subscription = task.assignees.find((assignee) => assignee.id === userId);
        let ownStatus = "NULL";
        if (subscription) {
          ownStatus = subscription.status;
        }

        return {
          ...message,
          task: {
            ...task,
            status: ownStatus
          }
        };
      });
    }
    return [];
  } catch (error) {
    console.log("@SERVICES_MessageServices_getMessages: ", error);
    return [];
  }
};

const addReaction = (messageId, senderId, emojiId) =>
  MessageApi.addReaction(messageId, senderId, emojiId);

const removeReaction = (messageId, senderId) => MessageApi.removeReaction(messageId, senderId);

const editMessage = (messageId, newContent) => MessageApi.editMessage(messageId, newContent);

const deleteMessage = (messageId) => MessageApi.deleteMessage(messageId);

const messageService = {
  getMessages,
  addReaction,
  removeReaction,
  editMessage,
  deleteMessage
};

export default ErrorWrapper(messageService);
