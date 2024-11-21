// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCfIq4CUKKTfqgsVdCwwh-anm8Vqt2efq8",
  authDomain: "scf-demo-b786e.firebaseapp.com",
  projectId: "scf-demo-b786e",
  storageBucket: "scf-demo-b786e.firebasestorage.app",
  messagingSenderId: "542367855445",
  appId: "1:542367855445:web:f37c30d91c544cd80ab5dc",
  measurementId: "G-KMY5EXK5Z5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Background message received: ', payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };
  
    // Save the notification to localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    savedNotifications.push({
      title: notificationTitle,
      body: notificationOptions.body,
      id: Date.now(),
    });
  
    localStorage.setItem('notifications', JSON.stringify(savedNotifications));
  
    // Display the notification to the user
    self.registration.showNotification(notificationTitle, notificationOptions);
  });