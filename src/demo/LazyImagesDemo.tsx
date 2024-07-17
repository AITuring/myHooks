import { useLazyImages } from "../hooks";
import "./demo.css";
import image1 from "../assets/images/1.jpg";
import image2 from "../assets/images/2.jpg";
import image3 from "../assets/images/3.jpg";
import image4 from "../assets/images/4.jpg";
import image5 from "../assets/images/5.jpg";
import image6 from "../assets/images/6.jpg";
import image7 from "../assets/images/7.jpg";
import image8 from "../assets/images/8.jpg";
import image9 from "../assets/images/9.jpg";
import image10 from "../assets/images/10.jpg";
import loadingImg from "../assets/images/loading.png";

const LazyImagesDemo: React.FC = () => {
    const imageUrls = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
        image10,
    ];

    const { placeholder } = { placeholder: loadingImg };
    const imageStates = useLazyImages(imageUrls, { placeholder });

    return (
        <div className="hook">
            <div className="hook-head">
                <h2>useLazyImages</h2>
            </div>
            <div className="content">
                <div className="waterfall">
                    {imageStates.map((state, index) => (
                        <img
                            key={index}
                            id={`image-${index}`}
                            src={state.loaded ? state.src : placeholder}
                            alt={`Image ${index}`}
                            className="waterfall-image"
                            loading="lazy"
                            onLoad={() => {
                                // 图片加载完成后的回调
                                const imgElement = document.querySelector(
                                    `.waterfall-image:nth-child(${index + 1})`
                                );
                                if (imgElement) {
                                    imgElement.classList.add("loaded");
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
            </div>
        </div>
    );
};

export default LazyImagesDemo;
