import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <ScaleLoader size={80} color="#ffffff" />
      <p className="mt-6 text-white text-lg font-semibold animate-pulse text-center">
        {message}
      </p>
    </div>
  );
};

export default Spinner;
