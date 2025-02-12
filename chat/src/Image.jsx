import { useState } from 'react';

import './assets/css/Image.css'

export default function Image({image}){
    const { description, title, image_file } = image;
    const [isExpand, setIsExpand] = useState(false);

    return (
        <div className='image' onClick={() => setIsExpand(!isExpand)}>
            <img className="text-image"src={image_file} alt={title} />
            {isExpand && (
                <figure className='image-view'>
                    <h1>{title}</h1>
                    <img className="image-focus" src={image_file} alt={title} />
                    <figcaption>{description}</figcaption>
                </figure>
            )}
        </div>
    );
}