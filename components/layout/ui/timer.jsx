"use client";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";

const CountDownCard = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const deadline = new Date("2025-01-10T16:30:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return { days, hours, minutes, seconds };
    };

    const initialLoad = () => {
      setTimeLeft(calculateTimeLeft());
      setIsLoading(false);
    };

    initialLoad();

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const padZero = (num) => num.toString().padStart(2, "0");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100px] rounded-lg w-[30rem]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className=" text-white rounded-xl shadow-2xl  max-w-xl mx-auto space-y-2">
      <div className="grid grid-cols-4 gap-3 sm:gap-4 ">
        {[
          { label: "DAYS", value: timeLeft.days },
          { label: "HOURS", value: timeLeft.hours },
          { label: "MINUTES", value: timeLeft.minutes },
          { label: "SECONDS", value: timeLeft.seconds },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg   text-center transform transition-all duration-300 hover:scale-105"
          >
            <div className="text-sm sm:text-lg md:text-xl font-bold text-[#030dfe] mb-1">
              {padZero(value)}
            </div>
            <div className="text-xs sm:text-sm md:text-lg text-white uppercase tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold">
          <span>Alert: Countdown until our Official Launch!</span>
        </div>
        <div className="text-xs sm:text-sm opacity-80">
          Limited-Time Offer: 20% Off for 2 Years Subscription
        </div>
      </div>
    </div>
  );
};

export default CountDownCard;
