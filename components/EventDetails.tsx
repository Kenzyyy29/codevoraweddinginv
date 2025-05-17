// src/components/EventDetails.tsx
import {CalendarDays, Clock, MapPin} from "lucide-react";
import {Card} from "./ui/Card";

interface EventDetailsProps {
 date: Date;
 location: string;
 address: string;
 dressCode?: string;
}

export default function EventDetails({
 date,
 location,
 address,
 dressCode = "Semiformal (Warna Pastel)",
}: EventDetailsProps) {
 const formattedDate = date.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
 });

 const formattedTime = date.toLocaleTimeString("id-ID", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
 });

 return (
  <div className="py-12">
   <h2 className="text-3xl font-bold mb-8 text-center font-serif">
    Detail Acara
   </h2>

   <Card className="max-w-2xl mx-auto p-8">
    <div className="space-y-6">
     <div className="flex items-start gap-4">
      <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
       <CalendarDays className="h-6 w-6" />
      </div>
      <div>
       <h3 className="text-lg font-semibold">Tanggal & Waktu</h3>
       <p className="text-gray-600">{formattedDate}</p>
       <p className="text-gray-600 flex items-center gap-1 mt-1">
        <Clock className="h-4 w-4" />
        {formattedTime} WIB
       </p>
      </div>
     </div>

     <div className="flex items-start gap-4">
      <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
       <MapPin className="h-6 w-6" />
      </div>
      <div>
       <h3 className="text-lg font-semibold">Lokasi</h3>
       <p className="text-gray-600">{location}</p>
       <p className="text-gray-600 mt-1">{address}</p>
       <a
        href={`https://maps.google.com?q=${encodeURIComponent(
         location + " " + address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-indigo-600 hover:underline inline-block mt-2">
        Lihat di Google Maps
       </a>
      </div>
     </div>

     {dressCode && (
      <div className="flex items-start gap-4">
       <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         width="24"
         height="24"
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth="2"
         strokeLinecap="round"
         strokeLinejoin="round">
         <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
         <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
        </svg>
       </div>
       <div>
        <h3 className="text-lg font-semibold">Dress Code</h3>
        <p className="text-gray-600">{dressCode}</p>
       </div>
      </div>
     )}
    </div>
   </Card>
  </div>
 );
}
