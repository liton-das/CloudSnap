import React from 'react'

const Button = ({onClick,loading}) => {
  return (
    <>
      <button
        onClick={onClick}
        className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm"
      >
        {loading}
      </button>
    </>
  );
};

export default Button
