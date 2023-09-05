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
          console.log("aasasasa", payload);
          const { body, icon, title } = payload?.notification;

          toast.custom((t) => (
            <div
              style={{
                background: "#ffffff",
                height: "auto",
                boxShadow:
                  "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
                borderRadius: "0.375rem",
                display: "flex",
                width: "75%",
                maxWidth: "80rem",
                margin: "0 auto",
                position: "sticky",
                top: "0.75rem",
                padding: "0.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <img
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                  width={100}
                  height={24}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingLeft: "1.25rem",
                  }}
                >
                  <span style={{ fontSize: "1.125rem", color: "#000" }}>
                    title
                  </span>
                  <p
                    style={{
                      marginTop: "0.25rem",
                      fontSize: "0.875rem",
                      color: "#718096",
                    }}
                  >
                    title kspodsdpp csipodisdpos
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                style={{
                  borderLeft: "1px solid #e2e8f0",
                  width: "4rem",
                  color: "#667eea",
                  paddingLeft: "0.5rem",
                }}
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
