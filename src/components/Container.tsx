import React from "react";
import Header from "./Header";

const Container = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen h-screen bg-gray-100 items-center px-3">
      <div className="flex w-full mx-auto md:w-2/3 lg:w-1/3">
        <div className="w-full bg-white shadow-lg rounded-xl mx-2 p-4">
          <Header />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Container;
