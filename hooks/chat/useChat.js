import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useEffect, useMemo } from 'react';

import { getMetrics } from '@/services/socket/socket-api';

import useChatStore from '../../store/chat/chat';
import { normalizedMessages } from '../../utils/fns/chat';
import { useUser } from '../data/useUser';
import { useSocketConnection } from '../sockets/useSocketConnection';
import { useSocketEmit } from '../sockets/useSocketEmit';

export const useChat = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const namespace = 'chat';
  const { emit } = useSocketEmit(namespace);
  const {
    currentChatId,
    setCurrentChatId,
    previewChat,
    setPreviewChat,
    clearPreviewChat,
    chats,
    messages,
    typingUsers,
    messageReceipts,
    sidebarTyping,
    unreadCounts,
    onlineUsers,
    sendMessage,
    getChats,
    getChatMessages,
    deleteChat,
    sendTypingStatus,
    markMessageAsRead,
    emitSocialEvent,
    getOnlineUsersFromChats,
    setMessages,
    setChats,
    setUnreadCounts,
    setOnlineUsers,
    setMessageReceipts,
  } = useChatStore();

  const chatsQuery = useQuery({
    queryKey: ['chats', user?.id],
    queryFn: getChats,
    staleTime: Infinity,
    enabled: !!user,
  });

  const messagesQuery = useQuery({
    queryKey: ['chat_messages', currentChatId],
    queryFn: () => getChatMessages(currentChatId),
    staleTime: Infinity,
    enabled: !!currentChatId && currentChatId !== 'preview',
  });

  const { isConnected } = useSocketConnection(namespace);

  // const getChatMessages = async () => {
  //   try {
  //     const res = await apiGet(`/chat/${currentChatId}/messages`);
  //     return res.data.data;
  //   } catch (error) {}
  // };

  const { data: apiChats, isFetching: isFetchingChats } = useQuery({
    queryKey: ['chats', user.id],
    queryFn: () => getChats(),
    staleTime: Infinity,
    enabled: true,
  });

  useEffect(() => {
    if (apiChats) {
      setChats(apiChats);
      setUnreadCounts((prev) => ({
        ...prev,
        ...apiChats.reduce((acc, chat) => {
          acc[chat.id] = chat.unread_count;
          return acc;
        }, {}),
      }));

      setOnlineUsers(getOnlineUsersFromChats(apiChats));
    }
  }, [apiChats, getOnlineUsersFromChats, setChats, setOnlineUsers, setUnreadCounts]);

  // const getChats = async () => {
  //   try {
  //     const res = await apiGet(`/chat/chats`);
  //     return res.data.data;
  //   } catch (error) {
  //     console.error("Failed to fetch chats:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (chats && socketRef.current) {
  //     const getChatIds = () => chats.map((c) => c?.id).filter(Boolean);
  //     socketRef.current.emit(EVENTS.SOCIAL, getChatIds());
  //   }
  // }, [chats]);

  useEffect(() => {
    if (!messagesQuery.data) {
      setMessages({});
      setMessageReceipts({});
      return;
    }

    const normalized = normalizedMessages(messagesQuery.data);
    setMessages(normalized);

    const initialStatuses = Object.values(normalized).reduce((acc, message) => {
      if (message.statuses?.length > 0) {
        acc[message.id] = message.statuses.reduce((statusAcc, status) => {
          statusAcc[status.user_id] = status.status;
          return statusAcc;
        }, {});
      }
      return acc;
    }, {});
    setMessageReceipts((prev) => ({ ...prev, ...initialStatuses }));
  }, [getChatMessages, messagesQuery.data, setMessageReceipts, setMessages]);

  useEffect(() => {
    useChatStore.getState().initializePreviewChat();
  }, []);

  const combinedChats = useMemo(() => {
    const chatsArray = chats ?? [];
    return previewChat ? [previewChat, ...chatsArray] : chatsArray;
  }, [previewChat, chats]);

  const deleteChatMutation = useMutation({
    mutationFn: () => deleteChat(currentChatId),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats', user?.id]);
      setCurrentChatId(null);
      message.success('Chat deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting chat:', error);
      message.error('Failed to delete chat');
    },
  });

  useEffect(() => {
    if (chatsQuery.data) {
      setChats(chatsQuery.data);
      setUnreadCounts((prev) => ({
        ...prev,
        ...chatsQuery.data.reduce((acc, chat) => {
          acc[chat.id] = chat.unread_count;
          return acc;
        }, {}),
      }));
      setOnlineUsers(getOnlineUsersFromChats(chatsQuery.data));
    }
  }, [chatsQuery.data, setChats, setUnreadCounts, setOnlineUsers, getOnlineUsersFromChats]);

  useEffect(() => {
    if (messagesQuery.data) {
      const normalized = normalizedMessages(messagesQuery.data);
      setMessages(normalized);
      const initialStatuses = Object.values(normalized).reduce((acc, message) => {
        if (message.statuses?.length > 0) {
          acc[message.id] = message.statuses.reduce((statusAcc, status) => {
            statusAcc[status.user_id] = status.status;
            return statusAcc;
          }, {});
        }
        return acc;
      }, {});
      setMessageReceipts((prev) => ({ ...prev, ...initialStatuses }));
    } else if (!currentChatId || currentChatId === 'preview') {
      setMessages({});
      setMessageReceipts({});
    }
  }, [messagesQuery.data, currentChatId, setMessages, setMessageReceipts]);

  useEffect(() => {
    useChatStore.getState().initializePreviewChat();
  }, []);

  useEffect(() => {
    if (!chats || !user) return;
    const chatIds = chats.map((c) => c?.id).filter(Boolean);
    const connections = {
      chat: {
        connected: user && getMetrics().connectionStates[namespace] === 'connected',
      },
    };
    emitSocialEvent(chatIds, emit, connections);
  }, [chats, user, emitSocialEvent, emit]);

  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = getMetrics();
      console.log('Socket Metrics:', metrics);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const combinedChats = useMemo(() => {
  //   const chatsArray = chatsQuery.data || chats;
  //   return previewChat ? [previewChat, ...chatsArray] : chatsArray;
  // }, [previewChat, chats, chatsQuery.data]);

  return {
    chats: combinedChats,
    isFetchingChats: chatsQuery.isLoading,
    isFetchingChatMessages: messagesQuery.isLoading,
    messages,
    typingUsers,
    messageReceipts,
    sidebarTyping,
    unreadCounts,
    onlineUsers,
    sendMessage: (content, recipientId, chatId) =>
      sendMessage(content, recipientId, chatId, user, emit, {
        chat: {
          connected: user && getMetrics().connectionStates[namespace] === 'connected',
        },
      }),
    sendTypingStatus: (isTyping) =>
      sendTypingStatus(
        isTyping,
        user,
        {
          chat: {
            connected: user && getMetrics().connectionStates[namespace] === 'connected',
          },
        },
        emit
      ),
    markMessageAsRead: (unreadMessages) =>
      markMessageAsRead(
        unreadMessages,
        user,
        {
          chat: {
            connected: user && getMetrics().connectionStates[namespace] === 'connected',
          },
        },
        emit
      ),
    deleteChatMutation,
  };
};
