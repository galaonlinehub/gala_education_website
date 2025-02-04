// Install necessary packages
// npm install socket.io-client axios react react-dom
"use client"
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { apiGet } from '@/src/services/api_service';


const Message = () => {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Connect to the signaling server
        const newSocket = io('https://edusockets.galahub.org/chat');
        setSocket(newSocket);

        // Handle incoming messages
        newSocket.on('message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => newSocket.close();
    }, []);

    const joinChat = () => {
        if (socket && userId) {
            socket.emit('join', { userId });
        }
    };

    const sendMessage = async () => {
        if (socket && userId && receiverId && message) {
            const msg = { senderId: userId, receiverId, message };
            socket.emit('message', msg);
            setMessages((prev) => [...prev, msg]);

            

            setMessage('');
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await apiGet(`https://galaweb.galahub.org/api/messages`);
            setMessages(response.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    return (
        <div>
            <h1>Real-Time Chat</h1>
            <div>
                <input
                    type="text"
                    placeholder="Your User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={joinChat}>Join Chat</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Receiver ID"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                />
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

            <div>
                <button onClick={fetchMessages}>Fetch Messages</button>
            </div>

            <div>
                <h2>Chat Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.senderId}:</strong> {msg.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Message;
