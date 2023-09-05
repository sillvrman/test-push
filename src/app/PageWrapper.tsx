"use client";

import React, { PropsWithChildren } from "react";
import "../../firebase";

const PageWrapper = ({ children }: PropsWithChildren) => {
  return <div>Askari{children}</div>;
};

export default PageWrapper;
