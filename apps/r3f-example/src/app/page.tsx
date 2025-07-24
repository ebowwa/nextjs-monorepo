// app/page.tsx

"use client";
import { useEffect, useRef, useState } from 'react';
import { ThreeJSStore } from './store';
import { useRouter } from 'next/navigation';
import { useViewportSize } from '@/components/viewport/useViewportSize';

export default function ThreeJSPage() {
    const threeJSStore = useRef<ThreeJSStore | null>(null);
    const [isBrowser, setIsBrowser] = useState(false);
    const router = useRouter();
    const { width, height } = useViewportSize();

    useEffect(() => {
        setIsBrowser(true);

        threeJSStore.current = new ThreeJSStore();

        // Render the scene
        threeJSStore.current.animate();

        // Clean up
        return () => {
            if (threeJSStore.current?.renderer) {
                threeJSStore.current.renderer.dispose();
            }
        };
    }, [router, width, height]);

    return (
        <div ref={(el) => {
            if (el && threeJSStore.current?.renderer && isBrowser) {
                el.appendChild(threeJSStore.current.renderer.domElement);
            }
        }} />
    );
}