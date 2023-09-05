"use client";

import React, { PropsWithChildren } from "react";
import "../../firebase";

const PageWrapper = ({ children }: PropsWithChildren) => {
  console.log("first");
  return <div>{children}</div>;
};

export default PageWrapper;
