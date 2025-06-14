import { useEffect, useState } from 'react';

const preloadImage = (src: string) =>
  new Promise((resolve) => {
    const element = new Image();
    element.onload = () => resolve(true);
    element.onerror = () => resolve(false);
    element.src = src;
  });

const useImagePreload = (images: string[]) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const preload = async () => {
      for (const image of images) {
        const status = await preloadImage(image);
        if (status) setSrc(image);
      }
    };
    preload();
  }, [images]);

  return src;
};

export default useImagePreload;
