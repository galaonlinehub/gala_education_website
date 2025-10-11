
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState, useMemo
} from "react";
import { io } from "socket.io-client";

import { socket_base_url } from "@/config/settings";
import { sessionStorageFn } from "@/utils/fns/client";
import { encrypt } from "@/utils/fns/encryption";
import { v4 as uuidv4 } from 'uuid';


const PaymentSocketContext = createContext();

export const PaymentSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastDonation, setLastDonation] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const listenersRef = useRef(new Set());

  const room_name = useMemo( () => uuidv4().replace(/-/g, "").substring(0, 10), [] );


  useEffect(() => {
    const newSocket = io(`${socket_base_url}payment`);

    newSocket.on("connect", () => {
      setIsConnected(true);

      if (room_name) {
        newSocket.emit("join", { id: room_name });
      }
    });
    

    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    newSocket.on("donation", (paymentMsg) => {
      const encryptedMsg = encrypt(JSON.stringify(paymentMsg?.status));
      sessionStorageFn.set("donation_msg", encryptedMsg);

      setLastDonation(paymentMsg?.status);

      // Notify all listeners
      listenersRef.current.forEach((listener) => {
        listener(paymentMsg);
      });
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      console.log("Cleaning up socket connection");
      newSocket.disconnect();
      setSocket(null);
      setIsConnected(false);
    };
  }, []);

 
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
    addListener,
    room_name

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
    throw new Error(
      "usePaymentSocketContext must be used within PaymentSocketProvider"
    );
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
