// src/lib/blob.ts
import {put} from "@vercel/blob";
import type {PutBlobResult} from "@vercel/blob";

export async function uploadFile(file: File): Promise<PutBlobResult> {
 const blob = await put(file.name, file, {
  access: "public",
 });
 return blob;
}

export function getBlobUrl(path: string): string {
 return `https://public.blob.vercel-storage.com/${path}`;
}
