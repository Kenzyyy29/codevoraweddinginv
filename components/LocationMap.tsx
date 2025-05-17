"use client";

import {useEffect, useRef} from "react";
import {Card} from "./ui/Card";

interface LocationMapProps {
 lat: number;
 lng: number;
 location: string;
 zoom?: number;
}

export default function LocationMap({
 lat,
 lng,
 location,
 zoom = 15,
}: LocationMapProps) {
 const mapRef = useRef<HTMLDivElement>(null);
 const mapInstance = useRef<google.maps.Map | null>(null);
 const markerInstance = useRef<google.maps.Marker | null>(null);

 useEffect(() => {
  if (!window.google || !window.google.maps || !mapRef.current) return;

  const google = window.google;
  const maps = google.maps;

  // Initialize map
  mapInstance.current = new maps.Map(mapRef.current, {
   center: {lat, lng},
   zoom,
   mapId: "INVITATION_MAP",
   styles: [
    {
     featureType: "poi",
     elementType: "labels",
     stylers: [{visibility: "off"}],
    },
    {
     featureType: "transit",
     elementType: "labels",
     stylers: [{visibility: "off"}],
    },
   ],
  });

  // Add marker
  markerInstance.current = new maps.Marker({
   position: {lat, lng},
   map: mapInstance.current,
   title: location,
   icon: {
    url:
     "data:image/svg+xml;charset=UTF-8," +
     encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%234f46e5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `),
    scaledSize: new maps.Size(40, 40),
    anchor: new maps.Point(20, 40),
   },
  });

  // Add info window
  const infoWindow = new maps.InfoWindow({
   content: `
        <div class="p-2">
          <h3 class="font-bold">${location}</h3>
          <a href="https://maps.google.com?q=${encodeURIComponent(
           lat + "," + lng
          )}" 
             target="_blank" 
             class="text-blue-600 hover:underline"
             style="font-size: 12px">
            Buka di Google Maps
          </a>
        </div>
      `,
  });

  markerInstance.current?.addListener("click", () => {
   if (!mapInstance.current) return;

   infoWindow.open({
    anchor: markerInstance.current || undefined,
    map: mapInstance.current,
    shouldFocus: false,
   });
  });

  return () => {
   if (markerInstance.current) {
    markerInstance.current.setMap(null);
   }
  };
 }, [lat, lng, location, zoom]);

 // Load Google Maps script
 useEffect(() => {
  if (document.querySelector("#google-maps-script")) return;

  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  return () => {
   document.head.removeChild(script);
  };
 }, []);

 return (
  <div className="py-12">
   <h2 className="text-3xl font-bold mb-8 text-center font-serif">
    Lokasi Acara
   </h2>

   <Card className="overflow-hidden">
    <div
     ref={mapRef}
     className="w-full h-96 rounded-lg"
    />

    <div className="p-6 bg-white">
     <h3 className="text-xl font-semibold mb-2">{location}</h3>
     <p className="text-gray-600 mb-4">
      Acara akan dimulai tepat waktu. Mohon hadir 30 menit sebelumnya.
     </p>
     <a
      href={`https://maps.google.com?q=${encodeURIComponent(lat + "," + lng)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-indigo-600 hover:underline">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       width="16"
       height="16"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round">
       <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
       <circle
        cx="12"
        cy="10"
        r="3"
       />
      </svg>
      Buka di Google Maps
     </a>
    </div>
   </Card>
  </div>
 );
}
