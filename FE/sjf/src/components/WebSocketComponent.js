import React, { useEffect } from "react";
import useWebSocket from "react-use-websocket";

function WebSocketComponent({ updateJobs }) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8000/ws/jobsUpdate/",
  );

  useEffect(() => {
    if (lastMessage !== null) {
      const jobData = JSON.parse(lastMessage.data);
      updateJobs(jobData, "socket");
    }
  }, [lastMessage]);

  return null;
}

export default WebSocketComponent;
