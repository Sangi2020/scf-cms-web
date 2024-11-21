import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCfIq4CUKKTfqgsVdCwwh-anm8Vqt2efq8",
  authDomain: "scf-demo-b786e.firebaseapp.com",
  projectId: "scf-demo-b786e",
  storageBucket: "scf-demo-b786e.firebasestorage.app",
  messagingSenderId: "542367855445",
  appId: "1:542367855445:web:f37c30d91c544cd80ab5dc",
  measurementId: "G-KMY5EXK5Z5",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    // Get token after requesting permission
    const currentToken = await getToken(messaging, {
      vapidKey: "BF5J8s7FNGe2FqwX2M968WWwSXy9fBooUqrm1KGKykqfwBiMPcGo-ryBdFl3xHkOx0TejNG2cwrA0GQAqEQCQDE",
    });

    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Send the token to your backend or use it for other purposes
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Handle foreground messages (when the app is in the foreground)
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
});
