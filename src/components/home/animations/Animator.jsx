import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Animator = ({ 
  children, 
  delay = 0, 
  className = "", 
  direction = "up"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.3
  });
  

  const getInitialPosition = () => {
    switch(direction) {
      case "down":
        return { opacity: 0, y: -50 };
      case "left":
        return { opacity: 0, x: 50 };
      case "right":
        return { opacity: 0, x: -50 };
      case "up":
      default:
        return { opacity: 0, y: 50 };
    }
  };
  
  const getAnimationTarget = () => {
    if (isInView) {
      return { opacity: 1, x: 0, y: 0 };
    } else {
      return getInitialPosition();
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={getAnimationTarget()}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut", 
        delay 
      }}
    >
      {children}
    </motion.div>
  );
};
export default Animator;