import React, { useRef, useState } from 'react';
import './Imagegenerator.css';
import AI_icon from '../components/Assets/default_image.svg';

const Imagegenerator = () => {
    const [imageUrl, setImageUrl] = useState(AI_icon);
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (!inputRef.current.value) return;

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: inputRef.current.value }),
            });

            const data = await response.json();

            if (data.url) {
                setImageUrl(data.url);
            } else {
                alert('Failed to generate image. Try again.');
            }
        } catch (error) {
            console.error('Error generating image:', error);
            alert('Error generating image. Check the console for details.');
        }

        setLoading(false);
    };

    return (
        <div className='AI-Imagegen'>
            <div className='heading'>AI Image <span>Generator</span></div>
            <div className="img-loading">
                <div className='img'>
                    {loading ? <p>Loading...</p> : <img src={imageUrl} alt="Generated" />}
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} placeholder='Type your command here' className='search-input' />
                <button className='search-button' onClick={imageGenerator}>Generate</button>
            </div>
        </div>
    );
};

export default Imagegenerator;
