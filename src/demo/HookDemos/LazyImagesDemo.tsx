import { useLazyImages } from "@/hooks";
import { Card } from "@/components";
import image1 from "@/assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import image3 from "@/assets/images/3.jpg";
import image4 from "@/assets/images/4.jpg";
import loadingImg from "@/assets/images/loading.png";

const LazyImagesDemo: React.FC = () => {
    const imageUrls = [
        image1,
        image2,
        image3,
        image4,
    ];

    const { placeholder } = { placeholder: loadingImg };
    const imageStates = useLazyImages(imageUrls, { placeholder });

    return (
        <Card
            title="useLazyImages"
            content={
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
                    {imageStates.map((state, index) => (
                        <img
                            key={index}
                            id={`image-${index}`}
                            src={state.loaded ? state.src : placeholder}
                            alt={`Image ${index}`}
                            className="w-full h-auto transition-opacity duration-300 ease-in-out"
                            loading="lazy"
                            onLoad={() => {
                                // 图片加载完成后的回调
                                const imgElement = document.querySelector(
                                    `.waterfall-image:nth-child(${index + 1})`
                                );
                                if (imgElement) {
                                    imgElement.classList.remove("opacity-0");
                                    imgElement.classList.add("opacity-100");
                                }
                                console.log(`Image ${index} loaded`);
                            }}
                            onError={() => {
                                // 图片加载失败的回调
                                console.log(`Image ${index} failed`);
                            }}
                        />
                    ))}
                </div>
            }
        />
    );
};

export default LazyImagesDemo;
