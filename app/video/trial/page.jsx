"use client"
import React, { useEffect } from 'react'
import io from 'socket.io-client';

function TrialSocket() {
    useEffect(() => {
        // Connect to the signaling server
        const newSocket = io('https://edusockets.galahub.org/payment');
        
        newSocket.on('connect', () => {
            // Emit join event with email
            newSocket.emit('join', { email: 'frankndagula@outlook.com' });  // Replace with actual email
            console.log('Connected to payment namespace');
        });
        
        // Handle incoming messages
        newSocket.on('paymentResponse', (msg) => {
            console.log('Payment response received:', msg);
        });

        return () => newSocket.close();
    }, []);
  return (
    <div>TrialSocket</div>
  )
}

export default TrialSocket