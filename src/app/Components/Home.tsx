import React from "react";
import Doc2PDF from "./Folders/Doc2PDF";
import Excel2PDF from "./Folders/Excel2PDF";
import Image2PDF from "./Folders/Image2PDF";
import Text2pdf from "./Folders/Text2pdf";

const Home: React.FC  = () => {
  return (
    <div className="bg-black flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-green-500 font-extrabold text-6xl mb-6">PRODUCTS</h1>
      <div className="flex flex-wrap justify-around w-full max-w-4xl p-4">
        <div className="p-2 md:w-1/2">
          <Doc2PDF />
        </div>
        <div className="p-2 md:w-1/2">
          <Excel2PDF />
        </div>
        <div className="p-2 md:w-1/2">
          <Image2PDF />
        </div>
        <div className="p-2 md:w-1/2">
          <Text2pdf />
        </div>
      </div>
    </div>
  );
}

export default Home;
