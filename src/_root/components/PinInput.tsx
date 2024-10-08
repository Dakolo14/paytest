import React from 'react';
import { FaBackspace } from "react-icons/fa";

interface PinInputProps {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  handleBackspace: () => void;
}

const PinInput: React.FC<PinInputProps> = ({ pin, setPin, handleBackspace }) => {


  const handleDigitClick = (digit: string) => {
    if (pin.length < 4) {
      setPin(prevPin => prevPin + digit);
    }
  };

  return (
    <div className="text-white">
      <div className="flex gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-14 h-14 flex items-center justify-center bg-slate-900 text-white text-2xl rounded-lg"
          >
            {pin[index] || ''}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleDigitClick((i + 1).toString())}
            className="p-4 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {i + 1}
          </button>
        ))}
        <div />
        <button
          onClick={() => handleDigitClick('0')}
          className="p-4 bg-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="p-4 text-xl bg-transparent text-red-500 focus:outline-none"
        >
          <div className="flex justify-center">
            <FaBackspace className="h-7 w-7" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default PinInput;
