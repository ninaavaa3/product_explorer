import type React from "react";

export default function Card({
  title,
  placeholder,
  serchedValue,
  setSearchValue,
  chilren,
}: {
  title: string;
  placeholder: string;
  serchedValue: string;
  setSearchValue: (a: string) => void;
  chilren: React.ReactNode;
}) {
  return (
    <>
      {" "}
      <div className="bg-white overflow-hidden border-2 border-gray-300 shadow-xl rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-blue-100 "
            value={serchedValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {chilren}
        </div>
      </div>
    </>
  );
}
