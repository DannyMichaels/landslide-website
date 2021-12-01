import { useState, useEffect } from 'react';
import Image from 'next/image';

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;
  return {
    innerWidth,
    innerHeight,
  };
}

export default function BgImage() {
  const [width, setWidth] = useState(Number);
  const [height, setHeight] = useState(Number);

  useEffect(() => {
    const handleResize = () => {
      const { width, height } = getWindowDimensions();
      setWidth(width);
      setHeight(height);
      console.log('resize');
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (width && height) {
    return <Image src="/assets/hero.jpg" width={width} height={height} />;
  }

  return null;
}
