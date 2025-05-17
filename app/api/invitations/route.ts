// src/app/api/invitations/route.ts
import {db} from "@/lib/firebase/config";
import {collection, addDoc, getDocs, query, where} from "firebase/firestore";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 try {
  const body = await request.json();
  const docRef = await addDoc(collection(db, "rsvps"), body);
  return NextResponse.json({id: docRef.id}, {status: 201});
 } catch (error) {
  return NextResponse.json({error: "Failed to save RSVP"}, {status: 500});
 }
}

export async function GET(request: Request) {
 const {searchParams} = new URL(request.url);
 const code = searchParams.get("code");

 if (!code) {
  return NextResponse.json(
   {error: "Invitation code is required"},
   {status: 400}
  );
 }

 try {
  const q = query(collection(db, "invitations"), where("code", "==", code));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
   return NextResponse.json({error: "Invitation not found"}, {status: 404});
  }

  const invitation = querySnapshot.docs[0].data();
  return NextResponse.json(invitation);
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch invitation"},
   {status: 500}
  );
 }
}
