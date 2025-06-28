export const sendMessage = () => {};

export function handleNewMessage(message, setMessages, setChats) {
  setMessages((prev) => {
    if (prev[message.id]) return prev;

    return {
      ...prev,
      [message.id]: {
        id: message.id,
        chat_id: message.chat_id,
        sender_id: message.sender_id,
        content: message.content,
        type: message.type || "text",
        sent_at: message.sent_at,
        sent_at_iso: message.sent_at_iso,
        status: message.status,
        statuses: [],
        isTemp: true,
      },
    };
  });

  setChats((prevChats) => moveChatToTop(message.chat_id, prevChats));
}

export const handleMessageStatusUpdate = (status, setMessages) => {
  return ({ id }) => {
    setMessages((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], status },
      };
    });
  };
};

export const handleMessageIdUpadate = (setMessages, setMessageReceipts) => {
  return ({ old_id, new_id }) => {
    setMessages((prev) => {
      if (!prev[old_id]) return prev;

      const { [old_id]: oldMsg, ...rest } = prev;
      return {
        ...rest,
        [new_id]: {
          ...oldMsg,
          id: new_id,
          isTemp: false,
        },
      };
    });

    setMessageReceipts((prev) => {
      if (!prev[old_id]) return prev;

      const { [old_id]: status, ...rest } = prev;

      return {
        ...rest,
        [new_id]: status,
      };
    });
  };
};

const moveChatToTop = (chatId, chats) => {
  const index = chats.findIndex((c) => c.id === chatId);
  if (index === -1) return chats;

  const chat = chats[index];
  const updated = [...chats];
  updated.splice(index, 1);
  return [chat, ...updated];
};

export const normalizedMessages = (messages) =>
  messages.reduce((acc, msg) => {
    acc[msg.id] = {
      id: msg.id,
      chat_id: msg.chat_id,
      sender_id: msg.sender_id,
      content: msg.content,
      type: msg.type || "text",
      sent_at: msg.sent_at,
      sent_at_iso: msg.created_at,
      statuses: msg.statuses || [],
      sender: msg.sender,
    };
    return acc;
  }, {});

// export const handleMessageStatusBatchUpdate = (
//   setMessages,
//   setMessageReceipts
// ) => {
//   return ({ user_ids, message_ids, status }) => {
//     if (!Array.isArray(user_ids) || !Array.isArray(message_ids)) return;

//     setMessageReceipts((prev) => {
//       const updated = { ...prev };

//       for (const message_id of message_ids) {
//         const current = updated[message_id] || {};
//         for (const user_id of user_ids) {
//           current[user_id] = status;
//         }
//         updated[message_id] = current;
//       }

//       return updated;
//     });

//     // setMessageReceipts((prev) => {
//     //   const updated = { ...prev };

//     //   message_ids?.forEach((message_id) => {
//     //     updated[message_id] = {
//     //       ...(updated[message_id] || {}),
//     //       [user_id]: status,
//     //     };
//     //   });
//     //   return updated;
//     // });

//     setMessages((prev) =>
//       prev.map((msg) => {
//         const shouldUpdate = message_ids?.includes(msg.id);
//         if (!shouldUpdate) return msg;

//         return {
//           ...msg,
//           statuses: [
//             ...msg.statuses.filter((s) => s.user_id !== user_id),
//             { user_id, status, message_id: msg.id },
//           ],
//         };
//       })
//     );
//   };
// };

export const handleMessageStatusBatchUpdate = (
  setMessages,
  setMessageReceipts
) => {
  return ({ user_ids, message_ids, status }) => {
    console.log("emitted here at athe beginning")
    if (!Array.isArray(user_ids) || !Array.isArray(message_ids)) return;

    console.log(user_ids, message_ids, status);
    console.log(typeof user_ids, typeof message_ids, typeof status);

    setMessageReceipts((prev) => {
      const updated = { ...prev };

      for (const message_id of message_ids) {
        const current = updated[message_id] || {};

        for (const user_id of user_ids) {
          current[user_id] = status;
        }

        updated[message_id] = current;
      }

      return updated;
    });

    setMessages((prev) => {
      const updated = { ...prev };

      for (const message_id of message_ids) {
        const message = updated[message_id];
        if (!message) continue;

        // Remove statuses of involved user_ids
        const filteredStatuses =
          message.statuses?.filter((s) => !user_ids.includes(s.user_id)) || [];

        // Add new statuses
        const newStatuses = user_ids.map((user_id) => ({
          user_id,
          status,
          message_id,
        }));

        updated[message_id] = {
          ...message,
          statuses: [...filteredStatuses, ...newStatuses],
        };
      }

      return updated;
    });
  };
};
