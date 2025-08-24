import { toast } from "react-hot-toast";

export const showMessageToast = (
  message,
  {
    icon = "📬",
    position = "top-center",
    duration = 4000,
    onPlaySound = () => {},
  } = {}
) => {
  if (onPlaySound) {
    console.log("Attempting to play sound");
    onPlaySound();
  }

  toast(message?.content, {
    icon,
    position,
    duration,
    style: {
      borderRadius: "50px",
      background: "#333",
      color: "#fff",
    },
  });
};