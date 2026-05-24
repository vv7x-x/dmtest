/**
 * ضغط صور الأغلفة قبل الرفع — أسرع بكثير من رفع الملف الأصلي
 */
(function () {
  const MAX_WIDTH = 720;
  const JPEG_QUALITY = 0.82;
  const SKIP_COMPRESS_BELOW = 100 * 1024;

  async function compressCoverImage(file) {
    if (!file || !file.type.startsWith("image/")) return file;
    if (file.size <= SKIP_COMPRESS_BELOW && file.type === "image/jpeg") return file;

    let bitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      return file;
    }

    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { alpha: false });
    ctx.fillStyle = "#f5f1e6";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(bitmap, 0, 0, w, h);
    if (bitmap.close) bitmap.close();

    const blob = await new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b || file), "image/jpeg", JPEG_QUALITY);
    });

    return blob || file;
  }

  window.dmImageUtils = { compressCoverImage, MAX_WIDTH };
})();
