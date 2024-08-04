import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar({ children }: React.PropsWithChildren) {
  type location = {
    pathname: string;
  };
  const navigate = useNavigate();
  const location: location = useLocation();
  const [header, setHeader] = useState(location.pathname);

  return (
    <div className="h-svh overflow-hidden">
      <div className="bg-blue-300 align-middle text-center flex justify-center m-auto w-full font-serif py-2 font-bold">
        {header == "/chartsandmaps" ? "Charts and Maps" : "Contact Page"}
      </div>
      <div className="flex h-screen">
        <div className="h-[94%] bg-black text-white w-[20%]">
          <div className="w-full px-2 py-2 cursor-pointer">
            <div
              onClick={() => {
                navigate("/");
                setHeader("/contact");
              }}
              className="px-5 py-3 w-full flex hover:bg-sky-200 hover:text-black rounded-md text-center"
            >
              Contact
            </div>
          </div>
          <div className="w-full px-2 py-0 cursor-pointer">
            <div
              onClick={() => {
                navigate("/chartsandmaps");
                setHeader("/chartsandmaps");
              }}
              className="px-5 py-3 w-full flex hover:bg-sky-200 hover:text-black rounded-md text-center"
            >
              Charts
            </div>
          </div>
        </div>
        <div
          className={`${
            header == "/contact"
              ? "align-middle flex justify-center w-[100%]"
              : "h-[90vh] align-middle flex justify-center w-[100vw] overflow-y-auto"
          }`}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
