// utils/preloadImages.ts
export async function preloadImages(urls: string[], timeoutMs = 8000) {
  const preload = (url: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();

      const clean = () => {
        img.onload = null;
        img.onerror = null;
      };

      const done = () => {
        // дождаться декодирования, если доступно
        (img as any).decode?.()
          .catch(() => {})
          .finally(() => {
            clean();
            resolve();
          });
      };

      img.onload = () => done();
      img.onerror = () => {
        clean();
        resolve();
      };

      img.src = url;

      // если уже в кеше
      if (img.complete) done();
    });

  // страховка по времени, чтобы не виснуть вечно
  const guard = new Promise<void>((r) => setTimeout(r, timeoutMs));

  await Promise.race([
    (async () => {
      for (const u of urls) {
        // последовательная загрузка, чтобы не забивать канал
        // eslint-disable-next-line no-await-in-loop
        await preload(u);
      }
    })(),
    guard,
  ]);
}
