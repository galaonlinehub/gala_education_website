import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import {  LuClock, LuInfo } from "react-icons/lu";

import { localStorageFn } from "@/utils/fns/client";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [ setTargetDate] = useState(null);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Get or create target date (7 days from when first created)
    let targetDate;

    // Try to get existing target date from memory (in real app, use localStorage)
    const storedTarget =
      typeof window !== "undefined"
        ? localStorageFn.get("countdownTarget")
        : null;

    if (storedTarget) {
      targetDate = new Date(storedTarget);
    } else {
      // Create new target date (7 days from now)
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);

      // Store target date (in real app, use localStorage for persistence across browser sessions)
      if (typeof window !== "undefined") {
        localStorageFn.set("countdownTarget", targetDate.toISOString());
      }
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    // Update immediately
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, "0");

  // const resetTimer = () => {
  //   const newTarget = new Date();
  //   newTarget.setDate(newTarget.getDate() + 7);
  //   setTargetDate(newTarget);

  //   if (typeof window !== "undefined") {
  //     localStorageFn.set("countdownTarget", newTarget.toISOString());
  //   }
  // };

  const galat = useTranslations('gala_ai');

  return (
    <div className="flex items-center justify-center p-4 mt-8">
      <div className="bg-[#001840]/80 bg-gradient-to-br rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <LuClock className="w-8 h-8 text-white mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {galat('update_alert')}
            </h1>
          </div>
          <div className="flex items-center justify-center text-white/80">
            <LuInfo className="w-5 h-5 mr-2" />
            <p className="text-sm sm:text-lg">
              {galat('update_description')}
            </p>
          </div>
        </div>

        {/* Timer Display */}
        {!isExpired ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(timeLeft.days)}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {galat('days')}
              </div>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(timeLeft.hours)}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {galat('hours')}
              </div>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(timeLeft.minutes)}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {galat('minutes')}
              </div>
            </div>

            <div className="bg-white/20 rounded-2xl p-6 text-center backdrop-blur-sm">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {formatTime(timeLeft.seconds)}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {galat('seconds')}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {galat('times_up')}
            </h2>
            <p className="text-xl text-white/80">{galat('countdown_ended')}</p>
          </div>
        )}

        {/* Progress Bar */}
        {!isExpired && (
          <div className="w-full bg-white/20 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-pink-500 to-yellow-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.max(
                  0,
                  100 -
                  ((timeLeft.days * 24 * 60 * 60 +
                    timeLeft.hours * 60 * 60 +
                    timeLeft.minutes * 60 +
                    timeLeft.seconds) /
                    (7 * 24 * 60 * 60)) *
                  100
                )}%`,
              }}
            ></div>
          </div>
        )}

        {/* Additional Info */}
        <div className="text-center text-white/60 mb-4">
          <p className="text-sm">
            {isExpired
              ? galat('timer_completed')
              : galat('updates_in_progress')}
          </p>
        </div>
      </div>
    </div>
  );
}
