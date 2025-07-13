import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <ScaleLoader size={80} />
    </div>
  );
};

export default Spinner;
