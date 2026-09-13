// Уменьшаем фото прямо в браузере перед загрузкой: телефонные снимки по 3-8 МБ
// превращаются в JPEG ~150-300 КБ, и лимит тела запроса на Vercel (4.5 МБ) не мешает.
export async function resizeImage(file: File, maxSide = 1200, quality = 0.82): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Не удалось прочитать картинку. Сохраните её как JPEG или PNG и попробуйте снова");
  }

  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Браузер не поддерживает обработку картинок");
  // Белый фон, чтобы прозрачные PNG не стали чёрными в JPEG
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Не удалось сжать картинку"))),
      "image/jpeg",
      quality
    )
  );
}
