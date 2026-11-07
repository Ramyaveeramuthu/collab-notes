import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("note:update", setText);
    return () => {
      socket.off("note:update", setText);
    };
  }, []);

  return (
    <textarea
      value={text}
      onChange={(e) => {
        setText(e.target.value);
        socket.emit("note:update", e.target.value);
      }}
      style={{ width: "100%", height: "90vh" }}
    />
  );
}