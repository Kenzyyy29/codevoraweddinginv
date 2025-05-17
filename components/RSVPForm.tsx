// src/components/RSVPForm.tsx
"use client";

import {useState, useRef} from "react";
import {Button} from "./ui/Button";

export default function RSVPForm() {
 const [formData, setFormData] = useState({
  name: "",
  email: "",
  attendance: "yes",
  guests: 1,
  message: "",
  photo: null as File | null,
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submissionSuccess, setSubmissionSuccess] = useState(false);
 const [photoPreview, setPhotoPreview] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: name === "guests" ? parseInt(value) : value,
  }));
 };

 const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
   const file = e.target.files[0];
   setFormData((prev) => ({...prev, photo: file}));

   // Create preview
   const reader = new FileReader();
   reader.onloadend = () => {
    setPhotoPreview(reader.result as string);
   };
   reader.readAsDataURL(file);
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   let photoUrl = "";

   // Upload photo if exists
   if (formData.photo) {
    const photoFormData = new FormData();
    photoFormData.append("file", formData.photo);

    const uploadResponse = await fetch("/api/blob/upload", {
     method: "POST",
     body: photoFormData,
    });

    if (!uploadResponse.ok) {
     throw new Error("Failed to upload photo");
    }

    const {url} = await uploadResponse.json();
    photoUrl = url;
   }

   // Submit RSVP data
   const response = await fetch("/api/invitations", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     ...formData,
     photo: photoUrl,
    }),
   });

   if (response.ok) {
    setSubmissionSuccess(true);
    setFormData({
     name: "",
     email: "",
     attendance: "yes",
     guests: 1,
     message: "",
     photo: null,
    });
    setPhotoPreview(null);
    if (fileInputRef.current) {
     fileInputRef.current.value = "";
    }
   }
  } catch (error) {
   console.error("Error submitting form:", error);
  } finally {
   setIsSubmitting(false);
  }
 };

 if (submissionSuccess) {
  return (
   <div className="text-center py-12 bg-white rounded-lg shadow-md">
    <h2 className="text-3xl font-bold mb-4 font-serif">Thank You!</h2>
    <p className="text-lg">
     Your RSVP has been received. We look forward to celebrating with you!
    </p>
   </div>
  );
 }

 return (
  <div className="bg-white rounded-lg shadow-md p-8">
   <h2 className="text-3xl font-bold mb-8 text-center font-serif">RSVP</h2>

   <form
    onSubmit={handleSubmit}
    className="max-w-md mx-auto space-y-6">
    <div>
     <label
      htmlFor="name"
      className="block text-sm font-medium text-gray-700 mb-1">
      Full Name
     </label>
     <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
     />
    </div>

    <div>
     <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 mb-1">
      Email
     </label>
     <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
     />
    </div>

    <div>
     <label className="block text-sm font-medium text-gray-700 mb-1">
      Will you be attending?
     </label>
     <div className="flex gap-4">
      <label className="inline-flex items-center">
       <input
        type="radio"
        name="attendance"
        value="yes"
        checked={formData.attendance === "yes"}
        onChange={handleChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
       />
       <span className="ml-2">Yes, I'll be there</span>
      </label>
      <label className="inline-flex items-center">
       <input
        type="radio"
        name="attendance"
        value="no"
        checked={formData.attendance === "no"}
        onChange={handleChange}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
       />
       <span className="ml-2">Regretfully decline</span>
      </label>
     </div>
    </div>

    {formData.attendance === "yes" && (
     <div>
      <label
       htmlFor="guests"
       className="block text-sm font-medium text-gray-700 mb-1">
       Number of Guests
      </label>
      <select
       id="guests"
       name="guests"
       value={formData.guests}
       onChange={handleChange}
       className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
       {[1, 2, 3, 4, 5].map((num) => (
        <option
         key={num}
         value={num}>
         {num}
        </option>
       ))}
      </select>
     </div>
    )}

    <div>
     <label
      htmlFor="message"
      className="block text-sm font-medium text-gray-700 mb-1">
      Message (Optional)
     </label>
     <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows={3}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
     />
    </div>

    <div>
     <label
      htmlFor="photo"
      className="block text-sm font-medium text-gray-700 mb-1">
      Upload a Photo (Optional)
     </label>
     <input
      type="file"
      id="photo"
      name="photo"
      ref={fileInputRef}
      onChange={handlePhotoChange}
      accept="image/*"
      className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
     />
     {photoPreview && (
      <div className="mt-2">
       <img
        src={photoPreview}
        alt="Preview"
        className="h-32 w-32 object-cover rounded-md"
       />
      </div>
     )}
    </div>

    <div className="pt-4">
     <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full">
      {isSubmitting ? "Submitting..." : "Submit RSVP"}
     </Button>
    </div>
   </form>
  </div>
 );
}
