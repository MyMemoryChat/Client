import { useState, useEffect } from 'react';

import './assets/css/Image.css'

export default function Image({ image }) {
    const isImagePath = typeof image == "string";
    const [imageData, setImageData] = useState({
        name: null,
        date: null,
        additional_infos: null,
        image_file: isImagePath? null: image.image_file,
    });

    useEffect(() => {
        if (isImagePath) {
            const image_name = image.split("/").pop();
            fetch(`http://192.168.2.34:5124/images/${image_name}`)
                .then(response => response.json())
                .then(data => {
                    setImageData({
                        name: data.name,
                        date: data.date,
                        additional_infos: data.additional_infos,
                        image_file: data.image_file,
                    });
                })
                .catch(error => console.error("Error fetching image data:", error));
        }
    }, [image]);

    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className='image' onClick={() => setIsExpand(!isExpand)}>
            <img className="text-image" src={imageData.image_file} alt={imageData.name || "Image"} />
            {isExpand && (
                <figure className='image-view'>
                    {imageData.name && (<h1>{imageData.name}</h1>)}
                    {imageData.date && <figcaption>{imageData.date}</figcaption>}
                    <img className="image-focus" src={imageData.image_file} alt={imageData.name || "Image"} />
                    {imageData.additional_infos && <figcaption>{imageData.additional_infos}</figcaption>}
                </figure>
            )}
        </div>
    );
}