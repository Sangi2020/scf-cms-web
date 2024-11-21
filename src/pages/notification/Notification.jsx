import { onMessage } from "firebase/messaging";
import { useEffect, useState } from "react";
import { messaging } from "../../config/firebaseConfig";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(savedNotifications);
  }, []);

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);

      const { title, body } = payload.notification;

      const newNotification = { title, body, id: Date.now() };

      // Add the new notification to the state
      setNotifications((prevNotifications) => {
        const updatedNotifications = [...prevNotifications, newNotification];

        // Save the updated notifications to localStorage
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

        return updatedNotifications;
      });
    });

    // Cleanup on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Your Notifications
        </h1>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-600">No notifications yet.</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-2"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {notification.title}
                </h2>
                <p className="text-gray-600">{notification.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
