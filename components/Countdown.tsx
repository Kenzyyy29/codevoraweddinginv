// src/components/Countdown.tsx
"use client";

import {useEffect, useState} from "react";

interface CountdownProps {
 targetDate: Date;
}

export default function Countdown({targetDate}: CountdownProps) {
 const [timeLeft, setTimeLeft] = useState({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
 });

 useEffect(() => {
  const interval = setInterval(() => {
   const now = new Date();
   const difference = targetDate.getTime() - now.getTime();

   if (difference <= 0) {
    clearInterval(interval);
    return;
   }

   const days = Math.floor(difference / (1000 * 60 * 60 * 24));
   const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
   );
   const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((difference % (1000 * 60)) / 1000);

   setTimeLeft({days, hours, minutes, seconds});
  }, 1000);

  return () => clearInterval(interval);
 }, [targetDate]);

 return (
  <div className="text-center py-12">
   <h2 className="text-3xl font-bold mb-8 font-serif">
    Countdown to Our Special Day
   </h2>
   <div className="flex justify-center gap-4">
    <TimeBox
     value={timeLeft.days}
     label="Days"
    />
    <TimeBox
     value={timeLeft.hours}
     label="Hours"
    />
    <TimeBox
     value={timeLeft.minutes}
     label="Minutes"
    />
    <TimeBox
     value={timeLeft.seconds}
     label="Seconds"
    />
   </div>
  </div>
 );
}

function TimeBox({value, label}: {value: number; label: string}) {
 return (
  <div className="bg-white p-4 rounded-lg shadow-md w-24">
   <div className="text-3xl font-bold">{Math.floor(value)}</div>
   <div className="text-sm text-gray-500">{label}</div>
  </div>
 );
}
