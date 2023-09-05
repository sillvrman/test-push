"use client";

import React, { PropsWithChildren, useEffect } from "react";
import "../../firebase";
import { getMessaging, onMessage } from "@firebase/messaging";
import { toast } from "react-hot-toast";

const PageWrapper = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const messaging = getMessaging();
    if (typeof navigator !== "undefined") {
      onMessage(messaging, (payload) => {
        toast.success("payload");
        new Notification("ali");
      });
    }
  }, []);

  return <div>Askari{children}</div>;
};

export default PageWrapper;
