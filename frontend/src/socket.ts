import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? window.location.toString()
    : import.meta.env.VITE_API_URL;

export const socket = io(URL, {
  autoConnect: true,
});
