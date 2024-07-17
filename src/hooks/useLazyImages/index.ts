import { useState, useEffect, useRef } from "react";

type UseLazyImageOptions = {
    threshold?: number;
    placeholder?: string;
};

const useLazyImages = (urls: string[], options?: UseLazyImageOptions) => {
    const [imageStates, setImageStates] = useState(
        urls.map(() => ({ src: options?.placeholder || "", loaded: false }))
    );
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const threshold = options?.threshold || 0; // 提取 threshold 到一个常量中

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry, index) => {
                if (
                    entry.isIntersecting ||
                    entry.intersectionRatio > threshold || // 使用提取的 threshold 常量
                    !entry.isIntersecting
                ) {
                    const img = new Image();
                    img.src = urls[index];
                    img.onload = () => {
                        setImageStates((prev) => {
                            const newStates = [...prev];
                            newStates[index] = {
                                src: urls[index],
                                loaded: true,
                            };
                            return newStates;
                        });
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${urls[index]}`);
                    };
                }
            });
        };

        observer.current = new IntersectionObserver(observerCallback, {
            root: null,
            rootMargin: "0px",
            threshold: threshold, // 使用提取的 threshold 常量
        });

        urls.forEach((url, index) => {
            const imgElement = document.getElementById(
                `image-${index}`
            ) as HTMLImageElement;
            if (imgElement && observer.current) {
                observer.current.observe(imgElement);
            }
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [urls, options]); // 直接依赖 options 而不是 options?.threshold

    return imageStates;
};

export default useLazyImages;
