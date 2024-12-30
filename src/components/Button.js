import React from "react";

const Button = ({ label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 ${className}`}
  >
    {label}
  </button>
);

export default Button;
