import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />
      {error && (
        <div className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
