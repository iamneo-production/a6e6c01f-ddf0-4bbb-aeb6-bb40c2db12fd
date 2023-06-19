import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const DefaultStars = ({ exportStar, value = 0 }) => {
    const [rating, setRating] = useState(value);

    const handleRating = (value) => {
        setRating(value);
        exportStar(rating)
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                const key = `star-${starValue}`;
                return (
                    <label key={key}>
                        <input
                            type="radio"
                            name="rating"
                            style={{ display: "none" }}
                            value={starValue}
                            onClick={() => handleRating(starValue)}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= value ? '#ffc107' : '#e4e5e9'}
                            size={30}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default DefaultStars;