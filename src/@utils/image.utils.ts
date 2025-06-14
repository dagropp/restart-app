const getDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

const resize = (
  dataURL: string,
  size: number,
  quality = 0.8,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = size;
      canvas.height = size;

      const scale = Math.max(size / img.width, size / img.height);
      const width = img.width * scale;
      const height = img.height * scale;
      const x = (size - width) / 2;
      const y = (size - height) / 2;

      ctx?.drawImage(img, x, y, width, height);

      resolve(canvas.toDataURL('image/webp', quality));
    };

    img.onerror = () => reject(new Error('Failed to load image'));
  });
};

export const image = { getDataURL, resize };
