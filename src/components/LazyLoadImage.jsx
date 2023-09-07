import { useEffect } from "react";
import { useState } from "react";
import { dummyImage } from "../data/dummyImage";



export default function LazyLoadImage({ src, alt }) {
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setImageSrc(src);
        };

    }, [src]);

    return <img style={{ width: "30px", height: "30px" }} src={(imageSrc || dummyImage)} alt={alt} />;
}