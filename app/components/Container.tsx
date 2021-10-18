import React from "react";

export const Container = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="max-w-screen-md mx-auto">{children}</div>
);
