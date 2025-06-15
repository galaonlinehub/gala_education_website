// "use client"; // Ensure this is a client-side hook

// import Cookies from "js-cookie";
// import { useEffect, useState, useCallback } from "react";
// import { io } from "socket.io-client";
// import { decrypt } from "../utils/constants/encryption";

// const useWebSocket = () => {
//     const [socket, setSocket] = useState(null);
//     const [events, setEvents] = useState([]);

//     // Utility function to get and decrypt the token
//     const getToken = useCallback(() => {
//         const encryptedToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d");

//         if (!encryptedToken) {
//             console.error("No token found in cookies");
//             return null;
//         }

//         try {
//             return decrypt(encryptedToken);
//         } catch (error) {
//             console.error("Error decrypting token:", error);
//             return null;
//         }
//     }, []);

//     useEffect(() => {
//         const token = getToken();
//         if (!token) return;

//         // Initialize WebSocket connection
//         const appSocket = io("http://localhost:3001/app", {
//             query: { token },
//         });

//         appSocket.on("connect", () => {
//             console.log("Client connected to WebSocket server");
//             console.log("Socket ID:", appSocket.id);
//         });

//         // General event listener for dynamic events
//         appSocket.onAny((event, data) => {
//             console.log(`Received event: ${event}`, data);
//             setEvents((prevEvents) => [...prevEvents, { event, data }]);
//         });

//         appSocket.on("disconnect", () => {
//             console.log("Disconnected from WebSocket server");
//         });

//         setSocket(appSocket);

//         // Cleanup connection on unmount
//         return () => {
//             appSocket.disconnect();
//         };
//     }, [getToken]);

//     // Function to join specific rooms/topics
//     const joinTopics = useCallback(
//         (topics) => {
//             if (!socket) return;
//             socket.emit("joinTopics", topics);
//             console.log("Joined topics:", topics);
//         },
//         [socket]
//     );

//     // Function to send a message to the server
//     const sendMessage = useCallback(
//         (event, payload) => {
//             if (!socket) return;
//             socket.emit(event, payload);
//             console.log(`Sent ${event} with payload:`, payload);
//         },
//         [socket]
//     );

//     return { socket, events, joinTopics, sendMessage };
// };

// export default useWebSocket;


"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { decrypt } from "../utils/fns/encryption";
import { api } from "../config/settings";
import { apiGet } from "@/src/services/api/api_service";

const useWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const queryClient = useQueryClient(); // React Query client instance

    // Function to fetch and decrypt the token
    const getToken = () => {
        const encryptedToken = Cookies.get("9fb96164-a058-41e4-9456-1c2bbdbfbf8d");

        if (!encryptedToken) {
            console.error("No token found in cookies");
            return null;
        }

        try {
            return decrypt(encryptedToken);
        } catch (error) {
            console.error("Error decrypting token:", error);
            return null;
        }
    };

    useEffect(() => {
        const initializeWebSocket = async () => {
            const token = getToken();
            if (!token) {
                console.error("Authentication token is missing or invalid.");
                return;
            }

            try {
                // Fetch topics (rooms) from the backend
                const { data: topics } = await apiGet("user_topics", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Connect to WebSocket server
                const appSocket = io("http://localhost:3001/app", {
                    query: { token },
                });

                // Join rooms for topics
                appSocket.emit("joinTopics", topics);

                // Handle new reminders and update React Query cache
                appSocket.on("newReminder", (reminder) => {
                    alert("We are here");
                    queryClient.setQueryData(["getReminders"], (oldReminders) => {
                        if (!oldReminders) return [reminder];
                        return [...oldReminders, reminder];
                    });
                });

                setSocket(appSocket);

                // Cleanup on unmount
                return () => {
                    appSocket.disconnect();
                };
            } catch (error) {
                console.error("Error initializing WebSocket:", error);
            }
        };

        initializeWebSocket();
    }, [queryClient]);

    return { socket };
};

export default useWebSocket;
