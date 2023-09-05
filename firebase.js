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
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <img className="h-10 w-10 rounded-full" src={icon} alt="" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{body}</p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
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
