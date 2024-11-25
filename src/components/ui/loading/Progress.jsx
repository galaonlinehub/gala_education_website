import React, { useEffect, useRef, useState, useCallback } from "react";
import { Flex, Progress } from "antd";

const ProgressComponent = () => {
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(0);
  const [percent3, setPercent3] = useState(0);

  const animationRef = useRef();

  const animateProgress = useCallback(() => {
    setPercent1((prev) => (prev < 100 ? prev + 1 : 100));
    setPercent2((prev) => (prev < 100 ? prev + 1 : 100));
    setPercent3((prev) => (prev < 100 ? prev + 1 : 100));

    if (percent1 < 100 || percent2 < 100 || percent3 < 100) {
      animationRef.current = requestAnimationFrame(animateProgress);
    }
  }, [percent1, percent2, percent3]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [animateProgress]);

  return (
    <Flex gap="small" wrap>
      <Progress  format={null}         style={{ width: '150px', height: '150px' }} // Adjust the size as needed
 size={60} type="circle" percent={percent1} />
    </Flex>
  );
};

export default ProgressComponent;
