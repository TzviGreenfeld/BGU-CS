import React, { Suspense, useEffect } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

const OnlineIndicator: React.FC = () => {
  if (typeof window === "undefined") {
    return null;
  }
  const online = useOnlineStatus();
  return <h1>{online ? "✅ Online" : "❌ Disconnected"}</h1>;
};

export default OnlineIndicator;
