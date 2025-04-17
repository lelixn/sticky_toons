
import React, { useEffect, useState } from "react";
import BlobShape from "./BlobShape";

const Decorations: React.FC = () => {
  const [position, setPosition] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <BlobShape
        className={`${
          position === 0 ? "opacity-60" : "opacity-20"
        } top-10 right-10 w-32 h-32 transition-opacity duration-1000 floating`}
        variant="1"
        fill="#FDE1D3"
      />
      <BlobShape
        className={`${
          position === 1 ? "opacity-60" : "opacity-20"
        } top-40 right-1/4 w-36 h-36 transition-opacity duration-1000 floating`}
        variant="2"
        fill="#E5DEFF"
      />
      <BlobShape
        className={`${
          position === 2 ? "opacity-60" : "opacity-20"
        } bottom-20 left-10 w-40 h-40 transition-opacity duration-1000 floating`}
        variant="3"
        fill="#FFDEE2"
      />
      <BlobShape
        className="top-1/3 left-1/3 w-56 h-56 opacity-10 floating"
        variant="default"
        fill="#D3E4FD"
      />
    </div>
  );
};

export default Decorations;
