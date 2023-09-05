"use client";

import React, { PropsWithChildren } from "react";
import "../../firebase";
import { getMessaging, onMessage } from "@firebase/messaging";

const messaging = getMessaging();

onMessage(messaging, (payload) => {
  console.log("payload", payload);
  new Notification("ali");
});

const PageWrapper = ({ children }: PropsWithChildren) => {
  return <div>Askari{children}</div>;
};

export default PageWrapper;
