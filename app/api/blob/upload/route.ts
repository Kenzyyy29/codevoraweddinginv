// src/app/api/blob/upload/route.ts
import {uploadFile} from "@/lib/blob/blobConfig";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 const formData = await request.formData();
 const file = formData.get("file") as File;

 if (!file) {
  return NextResponse.json({error: "File is required"}, {status: 400});
 }

 try {
  const blob = await uploadFile(file);
  return NextResponse.json(blob);
 } catch (error) {
  return NextResponse.json({error: "Failed to upload file"}, {status: 500});
 }
}
