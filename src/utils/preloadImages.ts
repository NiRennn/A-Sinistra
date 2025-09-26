export async function preloadImages(urls: string[]) {
  const tasks = urls.map((src) => new Promise<void>((res) => {
    const img = new Image();
    img.onload = () => res();
    img.onerror = () => res();
    if (img.decode) img.decode().catch(() => {}).finally(res);
    img.src = src;
  }));
  await Promise.all(tasks);
}
