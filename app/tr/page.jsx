"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Tr() {
  const [data, setData] = useState();

  useEffect(() => {
    const socket = io("http://localhost:9000");

    // socket.on("connect", () => {
    //   socket.emit("join", { email: "dnspascal094@gmail.com" });
    // });

    socket.on("paymentResponse", (msg) => {
      setData(msg.status);
      console.log("Message", msg);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => socket.close();
  }, []);
  return (
    <div className="flex h-screen w-screen justify-center items-center flex-col gap-4">
      <span className="text-3xl font-black">Testing Sockets</span>
      <div>{data}</div>
    </div>
  );
}
