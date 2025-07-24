// src/components/typewriter/dynamic.tsx

import React, { useState, useEffect } from 'react';
import useTypewriterEffect from '@/components/ui/typewriter/TypewriterEffect';
import styles from '@/components/ui/typewriter/TypewriterEffect.module.css';

interface DynamicTextComponentProps {
  categories: string[];
}

const DynamicTextComponent: React.FC<DynamicTextComponentProps> = ({ categories }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const dynamicCategory = useTypewriterEffect(categories, isClient);

  return (
    <h1 className={`${styles.typewriter} text-4xl md:text-6xl font-bold`}>
      Discover the Best <span className={styles.dynamicText}>{dynamicCategory}</span>
    </h1>
  );
};

export default DynamicTextComponent;
