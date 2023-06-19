import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <label key={`star-${starValue}`}>
                        <input
                            type="radio"
                            name="rating"
                            style={{ display: "none" }}
                            value={starValue}
                            onClick={() => handleRating(starValue)}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
                            size={30}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
