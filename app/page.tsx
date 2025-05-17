// src/app/page.tsx
"use client"; // Tambahkan ini karena kita menggunakan efek dan state untuk animasi

import HeroSection from "@/components/HeroSection";
import EventDetails from "@/components/EventDetails";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import LocationMap from "@/components/LocationMap";

import {useEffect, useState} from "react";
import {Leaf} from "lucide-react";

export default function Home() {
 const eventDate = new Date("2024-12-31T18:00:00");
 const [flowerPositions, setFlowerPositions] = useState<Array<any>>([]);

 useEffect(() => {
  // Generate random flower positions on client side
  const positions = [
   {top: "10%", left: "2%", animation: "float 6s ease-in-out infinite"},
   {top: "25%", right: "2%", animation: "float 8s ease-in-out infinite 1s"},
   {bottom: "30%", left: "3%", animation: "float 7s ease-in-out infinite 0.5s"},
   {
    bottom: "15%",
    right: "4%",
    animation: "float 9s ease-in-out infinite 1.5s",
   },
   {top: "40%", left: "1%", animation: "float 5s ease-in-out infinite"},
   {top: "60%", right: "1%", animation: "float 7s ease-in-out infinite 2s"},
  ];
  setFlowerPositions(positions);
 }, []);

 return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
   {/* Animated flowers */}
   {flowerPositions.map((pos, index) => (
    <div
     key={index}
     className="absolute text-green-200 opacity-70 z-0"
     style={{
      ...pos,
      fontSize: `${Math.random() * 20 + 10}px`,
      transform: `rotate(${Math.random() * 360}deg)`,
     }}>
     <Leaf className="animate-float" />
    </div>
   ))}

   <HeroSection />

   <div className="max-w-6xl mx-auto px-4 py-12 space-y-20 relative z-10">
    <Countdown targetDate={eventDate} />

    <EventDetails
     date={eventDate}
     location="Grand Ballroom, The Luxury Hotel"
     address="123 Celebration Ave, Jakarta, Indonesia"
    />

    <Gallery />

    <RSVPForm />

    <LocationMap
     lat={-6.2088}
     lng={106.8456}
     location="Grand Ballroom, The Luxury Hotel"
    />
   </div>
  </div>
 );
}
