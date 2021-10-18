import React, { Suspense as ReactSuspense, SuspenseProps } from "react";

// This component works around the following error:
//
//   Error: ReactDOMServer does not yet support Suspense.

export const Suspense = (props: SuspenseProps) => {
  // Immediately fallback if we're rendering on the server
  if (typeof window === "undefined") {
    return <>{props.fallback}</>;
  }
  // Otherwise render normally
  return <ReactSuspense {...props} />;
};
