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
          toast.custom((t) => (
            <div
              style={{
                height: "auto",
                boxShadow: "lg",
                borderRadius: "lg",
                alignItems: "center",
                paddingLeft: "2",
                paddingRight: "2",
                justifyContent: "between",
                backgroundColor: "white",
                display: "flex",
                width: "3/4",
                maxWidth: "lg",
                marginLeft: "auto",
                marginRight: "auto",
                position: "sticky",
                top: "3",
                paddingTop: "2",
                paddingBottom: "2",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", flex: "1" }}>
                <img
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  style={{ width: "10", height: "10" }}
                  width={100}
                  height={24}
                />
                <div style={{ placeContent: "start", paddingLeft: "5" }}>
                  <span style={{ fontSize: "lg", color: "black" }}>title</span>
                  <p
                    style={{
                      marginTop: "1",
                      fontSize: "sm",
                      color: "gray-600",
                    }}
                  >
                    title kspodsdpp csipodisdpos
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                style={{
                  borderLeft: "border-indigo-600",
                  width: "16",
                  color: "indigo-600",
                  paddingLeft: "2",
                }}
              >
                Close
              </button>
            </div>
          ));
          const { body, icon, title } = payload?.notification;
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
