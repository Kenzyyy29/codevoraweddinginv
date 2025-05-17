// src/components/HeroSection.tsx
import {Button} from "./ui/Button";

export default function HeroSection() {
 return (
  <div
   className="relative h-screen flex items-center justify-center bg-cover bg-center"
   style={{backgroundImage: "url('/images/hero-bg.jpg')"}}>
   <div className="absolute inset-0 bg-black bg-opacity-50" />

   <div className="relative z-10 text-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif">
     Sarah & Michael
    </h1>
    <p className="text-xl md:text-2xl mb-8">Are Getting Married</p>
    <p className="text-lg mb-12">December 31, 2024 • Jakarta, Indonesia</p>

    <div className="flex gap-4 justify-center">
     <Button variant="primary">View Invitation</Button>
     <Button variant="outline">RSVP Now</Button>
    </div>
   </div>
  </div>
 );
}
