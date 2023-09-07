import { useEffect } from "react";
import { useState } from "react";
import dummy from "../assests/note.svg"

export default function LazyLoadImage({ src, alt }) {
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setImageSrc(src);
        };

    }, [src]);

    return <img style={{ width: "30px" }} src={imageSrc ?? dummy} alt={alt} />;
}