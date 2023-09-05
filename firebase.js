import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { toast } from "react-hot-toast";

const config = {
  apiKey: "AIzaSyBL2TE3koZM_cQv0H_ptGrcQfWFNaZcPtQ",
  authDomain: "spring-mix-307509.firebaseapp.com",
  projectId: "spring-mix-307509",
  storageBucket: "spring-mix-307509.appspot.com",
  messagingSenderId: "968954900054",
  appId: "1:968954900054:web:fc36661a1871878a4315f7",
  measurementId: "G-1GL7GTVV2F",
};

initializeApp(config);

if (typeof navigator !== "undefined") {
  const messaging = getMessaging();

  const fetchToken = async () => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BKRbWn0D8GcBqBuy9YjG-k1lgvvv5Yb0FSwDUBIGVZrcMYAVb1BJ0w2B3ALDJcVkcuO1_alS5XCWwKrnw2NBFxU",
      });
      if (currentToken) {
        console.log(currentToken);
        onMessage(messaging, (payload) => {
          const { body, icon, title } = payload?.notification;

          toast.custom((t) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                justifyContent: "space-between",
                backgroundColor: "#4F46E5",
                width: "75%",
                maxWidth: "33.3333%",
                margin: "0 auto",
                position: "sticky",
                top: "3rem",
              }}
            >
              <div>
                <img
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  style={{ filter: "invert(1)" }}
                  width={100}
                  height={24}
                />
              </div>
              <div style={{ flex: "1", paddingLeft: "1rem" }}>
                <span style={{ fontSize: "1.25rem", color: "#FFFFFF" }}>
                  {title}
                </span>
                <p style={{ color: "#FFFFFF" }}>{body}</p>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                style={{ padding: "1.25rem" }}
              >
                Close
              </button>
            </div>
          ));
          self?.registration?.showNotification(title);

          new Notification(title || "", {
            body: body || "",
            icon: icon || "",
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      fetchToken();
    }
  });
}
