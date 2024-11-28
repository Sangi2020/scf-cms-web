import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io('https://scf-cms-be-hz4e.onrender.com');
    // const socketInstance = io('http://localhost:8080');

    setSocket(socketInstance);

    // Listen for new notifications globally
    socketInstance.on('new-notification', (notification) => {
      toast.info(`New Notification: ${notification.subject}`);
    });

    return () => {
      // Cleanup socket when the component unmounts
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};