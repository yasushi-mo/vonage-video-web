"use client";

import OT from "@opentok/client";
import { useEffect } from "react";

const API_KEY = "";
const SESSION_ID = "";
const TOKEN = "";

// Handling all of our errors here by alerting them
function handleError(error: any) {
  if (!error) return;
  alert(error.message);
}

function initializeSession() {
  const session = OT.initSession(API_KEY, SESSION_ID);

  // Subscribe to a newly created stream
  session.on("streamCreated", function (event) {
    session.subscribe(
      event.stream,
      "subscriber",
      {
        insertMode: "append",
        width: "100%",
        height: "100%",
      },
      handleError
    );
  });

  // Create a publisher
  const publisher = OT.initPublisher(
    "publisher",
    {
      insertMode: "append",
      width: "100%",
      height: "100%",
    },
    handleError
  );

  // Connect to the session
  session.connect(TOKEN, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      return handleError(error);
    }
    session.publish(publisher, handleError);
  });
}

export default function Home() {
  useEffect(() => {
    initializeSession();
  }, []);

  return <></>;
}
