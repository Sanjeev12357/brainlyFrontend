// Input.tsx
import React from 'react';
import './Input.css'; // Import the CSS

interface InputProps {
  label: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value?: string;
  name?: string;
}

export default function Input({
  label,
  placeholder,
  onChange,
  type = 'text',
  value,
  name,
}: InputProps) {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        name={name}
        value={value}
        placeholder=" "
        onChange={onChange}
        className="custom-input"
      />
      <label className="custom-label">{label}</label>
    </div>
  );
}
