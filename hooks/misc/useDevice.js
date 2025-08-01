import { useState, useEffect } from "react";

import { detectDevice } from "@/utils/fns/detect-device";

export const useDevice = () => {
  const [device, setDevice] = useState(() => detectDevice());

  useEffect(() => {
    const handleResize = () => {
      const updatedDevice = detectDevice();
      setDevice(updatedDevice);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return device;
};
