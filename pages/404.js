import React from "react";
import Topbar from "../components/Topbar";

const NotFound = () => (<>
    <Topbar/>
    <div
      className="relative select-none text-center mt-24"
      style={{top: "50%", transform: "translateY(-50%)"}}>
      <strong className="block text-2xl text-gray-300">404</strong>
      <span className="text-gray-900 text-xl">Package Not Found!</span>
    </div>
  </>
);

export default NotFound;
