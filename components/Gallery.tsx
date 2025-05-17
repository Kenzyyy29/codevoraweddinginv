// src/components/Gallery.tsx
import {Card} from "./ui/Card";
import {getBlobUrl} from "@/lib/blob/blobConfig";

const images = [
 {id: 1, path: "gallery/gallery-1.jpg", alt: "Couple at beach"},
 {id: 2, path: "gallery/gallery-2.jpg", alt: "Engagement photo"},
 // ... other images
];

export default function Gallery() {
 return (
  <div className="py-12">
   <h2 className="text-3xl font-bold mb-8 text-center font-serif">
    Our Gallery
   </h2>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {images.map((image) => (
     <Card
      key={image.id}
      className="overflow-hidden">
      <img
       src={getBlobUrl(image.path)}
       alt={image.alt}
       className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
      />
     </Card>
    ))}
   </div>
  </div>
 );
}
