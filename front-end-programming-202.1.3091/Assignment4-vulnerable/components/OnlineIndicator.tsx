import React, { useState, useEffect } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus";

// couldnt make it work with nextjs
const OnlineIndicator: React.FC = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null; // Render nothing on the server
  }
  const online = useOnlineStatus();
  return <h1>{online ? "✅ Online" : "❌ Disconnected"}</h1>;
};

export default OnlineIndicator;
