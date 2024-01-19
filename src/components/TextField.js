import React from "react";
import LabelComponent from "./LabelComponent";

function TextField({
  onChange = false,
  name = false,
  title = false,
  subtitle = false,
  rows = 0,
}) {
  function handleTextChange(e) {
    onChange(e.target.value);
  }
  return (
    <>
      <LabelComponent label={title}>
        <div className="mt-2">
          {rows > 0 ? (
            <>
              <textarea
                id={name}
                name={name}
                rows={3}
                className="block font-normal w-full bg-transparent rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
                onChange={(e) => handleTextChange(e)}
              />
            </>
          ) : (
            <div>
              <input
                type="text"
                name={name}
                id={name}
                className="block w-full font-normal rounded-md border-0 py-1.5 text-white bg-[#0D1117] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleTextChange(e)}
              />
            </div>
          )}
        </div>
        {subtitle && (
          <div>
            <p className="text-sm leading-6 text-gray-600 font-semibold">
              {subtitle}
            </p>
          </div>
        )}
      </LabelComponent>
    </>
  );
}

export default TextField;