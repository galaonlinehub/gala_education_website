import React from "react";
import { useState, useEffect } from "react";


const CountDownCard = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function calculateTimeLeft() {
    const targetDate = new Date();
    console.log(targetDate, "THIS IS THE TARGET DATE");
    targetDate.setDate(targetDate.getDate() + 40); // 40 days from now

    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    // Calculate the target date (40 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 40);

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial countdown
    setTimeLeft(calculateTimeLeft());

    // Update countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const padZero = (num) => num.toString().padStart(2, "0");

  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-8 text-center">
          <div className="w-1/4">
            <div className="text-4xl font-bold text-blue-600">{padZero(timeLeft.days)}</div>
            <div className="text-sm text-white">DAYS</div>
          </div>
          <div className="w-1/4">
            <div className="text-4xl font-bold text-blue-600">{padZero(timeLeft.hours)}</div>
            <div className="text-sm text-white">HOURS</div>
          </div>
          <div className="w-1/4">
            <div className="text-4xl font-bold text-blue-600">{padZero(timeLeft.minutes)}</div>
            <div className="text-sm text-white">MINUTES</div>
          </div>
          <div className="w-1/4">
            <div className="text-4xl font-bold text-blue-600">{padZero(timeLeft.seconds)}</div>
            <div className="text-sm text-white">SECONDS</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-white">️Alert: Countdown until our Official Launch!</div>
          <div className="text-white"> Limited-Time Offer: 20% Off for 2 Years Subscription</div>
        </div>
      </div>
    </div>
  );
};

export default CountDownCard;
