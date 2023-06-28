import React, { useState } from 'react';

const InputField = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                placeholder='Search'
                style={{ width: "500px" }}
                id="inputField"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default InputField;
