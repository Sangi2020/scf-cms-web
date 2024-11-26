// Notification.js
import React, { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = useSocket(); // Get the socket connection

  useEffect(() => {
    // Fetch existing notifications on component mount
    const fetchNotifications = async () => {
      const response = await axiosInstance.get('notification/get-all-notifications');
      const data = response.data;
      setNotifications(data);
    };

    fetchNotifications();

    if (socket) {
      // Listen for new notifications via socket
      socket.on('new-notification', (notification) => {
        console.log('New notification received:', notification);
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
        toast.info(`New Notification: ${notification.subject}`);
      });
    }

    return () => {
      if (socket) {
        socket.off('new-notification'); // Cleanup event listener
      }
    };
  }, [socket]);

  return (
    <div>
      <h1>Notifications</h1>
      <ul>
        {notifications.length === 0 ? (
          <li>No new notifications</li>
        ) : (
          notifications.map((notification) => (
            <li key={notification.id}>
              <strong>{notification.subject}</strong>: {notification.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notification;
