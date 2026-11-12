/**
 * Sends a form to Netlify Forms. `name` must match a form in public/__forms.html.
 * Text-only forms go URL-encoded; forms with files go as multipart. Throws if it didn't go through.
 */
export async function sendForm(endpoint: string, name: string, data: FormData): Promise<void> {
  data.set('form-name', name);
  const hasFile = [...data.values()].some((v) => typeof v !== 'string');
  const init: RequestInit = hasFile
    ? { method: 'POST', body: data }
    : {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      };
  const res = await fetch(endpoint, init);
  if (!res.ok) throw new Error(`Form ${name}: ${res.status}`);
}

/**
 * Shrinks a photo to at most `max` pixels on its long side as a JPEG. This keeps uploads small and drops
 * the photo's hidden details (GPS location, camera info). If the browser can't read the photo (some
 * HEIC files), the original is returned.
 */
export async function shrinkPhoto(file: File, max = 2000, quality = 0.85): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    if (!blob) return file;
    const base = file.name.replace(/\.[^.]+$/, '') || 'photo';
    return new File([blob], `${base}.jpg`, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}
