import React from "react";
import { Spinner } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="h-24 flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loader;
