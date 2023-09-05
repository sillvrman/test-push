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
                maxWidth: "md",
                width: "full",
                backgroundColor: "white",
                boxShadow: "lg",
                borderRadius: "lg",
                pointerEvents: "auto",
                display: "flex",
                ring: "1",
                ringColor: "black",
                ringOpacity: "5",
                animation: `${t.visible ? "animate-enter" : "animate-leave"}`,
              }}
            >
              <div style={{ flex: "1", width: "0", padding: "4" }}>
                <div style={{ display: "flex", alignItems: "start" }}>
                  <div style={{ paddingTop: "0.5" }}>
                    <img
                      style={{
                        height: "10",
                        width: "10",
                        borderRadius: "full",
                      }}
                      src={icon}
                      alt="cuddly icon"
                    />
                  </div>
                  <div style={{ marginLeft: "3", flex: "1" }}>
                    <p
                      style={{
                        fontSize: "sm",
                        fontWeight: "medium",
                        color: "gray-900",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        marginTop: "1",
                        fontSize: "sm",
                        color: "gray-500",
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", borderLeft: "border-gray-200" }}>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  style={{
                    width: "full",
                    border: "border-transparent",
                    borderRadius: "none",
                    borderTopRightRadius: "lg",
                    borderBottomRightRadius: "lg",
                    padding: "4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: "indigo-600",
                    hoverColor: "indigo-500",
                    focusOutline: "none",
                    focusRing: "2",
                    focusRingColor: "indigo-500",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          ));

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
