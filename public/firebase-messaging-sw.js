"use strict";

importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBL2TE3koZM_cQv0H_ptGrcQfWFNaZcPtQ",
    authDomain: "spring-mix-307509.firebaseapp.com",
    projectId: "spring-mix-307509",
    storageBucket: "spring-mix-307509.appspot.com",
    messagingSenderId: "968954900054",
    appId: "1:968954900054:web:fc36661a1871878a4315f7",
    measurementId: "G-1GL7GTVV2F",
  });
}
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
