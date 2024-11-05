// Input.tsx
import React from 'react';

type InputProps = {
  inputValues: string;
  setInputValues: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
};

const Input: React.FC<InputProps> = ({ inputValues, setInputValues, darkMode }) => (
  <input
    type="text"
    value={inputValues}
    onChange={(e) => setInputValues(e.target.value)}
    className={`w-full p-2 mb-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
    placeholder="Enter a task"
  />
);

export default Input;
