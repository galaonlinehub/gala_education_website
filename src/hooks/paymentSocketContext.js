import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { socket_base_url } from '@/src/config/settings';
import { encrypt } from '@/src/utils/fns/encryption';
import { sessionStorageFn } from '@/src/utils/fns/client';

const PaymentSocketContext = createContext();

export const PaymentSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const listenersRef = useRef(new Set());


  const joinRoom = (room) => {
    setRoomName(room);
    if (socket && socket.connected) {
      socket.emit('join', { id: room });
    }
  };

  useEffect(() => {
    const newSocket = io(`${socket_base_url}payment`);

    newSocket.on('connect', () => {
      setIsConnected(true);

      if (roomName) {
        newSocket.emit('join', { id: roomName });
      }
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('donation', (paymentMsg) => {

      const encryptedMsg = encrypt(JSON.stringify(paymentMsg?.status));
      sessionStorageFn.set('donation_msg', encryptedMsg);

      setLastDonation(paymentMsg?.status);

      // Notify all listeners
      listenersRef.current.forEach(listener => {
        listener(paymentMsg);
      });

    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    setSocket(newSocket);

    return () => {
      console.log('Cleaning up socket connection');
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

  useEffect(() => {
    if (socket && isConnected && roomName) {
      console.log(`Joining room: ${roomName}`);
      socket.emit('join', { id: roomName });
    }
  }, [socket, isConnected, roomName]);

  useEffect(() => {
    if (socket && socket.connected && roomName) {
      socket.emit('join', { id: roomName });
      console.log(`Joined room: ${roomName}`);
    }
  }, [socket, roomName]);

  const addListener = (callback) => {
    listenersRef.current.add(callback);

    return () => {
      listenersRef.current.delete(callback);
    };
  };

  const value = {
    socket,
    isConnected,
    lastDonation,
    roomName,
    joinRoom,
    addListener,
  };

  return (
    <PaymentSocketContext.Provider value={value}>
      {children}
    </PaymentSocketContext.Provider>
  );
};

export const usePaymentSocketContext = () => {
  const context = useContext(PaymentSocketContext);
  if (!context) {
    throw new Error('usePaymentSocketContext must be used within PaymentSocketProvider');
  }
  return context;
};

export const useDonationListener = (callback) => {
  const { addListener } = usePaymentSocketContext();

  useEffect(() => {
    if (callback) {
      const cleanup = addListener(callback);
      return cleanup;
    }
  }, [callback, addListener]);
};