import React from "react";
import { RotatingLines } from "react-loader-spinner";

function Loader() {
  return (
    <RotatingLines
      visible={true}
      height="75"
      width="75"
      strokeColor="#4f46e5"
      strokeWidth="3"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}

export default Loader;
