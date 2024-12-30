import React from "react";

const TextInput = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded"
  />
);

export default TextInput;
