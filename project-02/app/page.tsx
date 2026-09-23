
"use client";

import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      
      <h1 className="text-5xl font-bold">
        Counter App 🚀
      </h1>

      <p className="text-3xl mt-6">
        Count: {count}
      </p>
     
     <div className="flex gap-4 mt-6">
      <button
        onClick={() => setCount(count + 1)}
        className=" px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-700"
      >
        Increase
      </button>

      <button 
      onClick={() => setCount(count - 1)}
      className="bg-blue-500  px-6 py-3
      rounded-xl hover:bg-blue-700">
        Decrease
      </button>

      <button 
      onClick={() => setCount (0)} className=" bg-red-900 py-2 px-5 rounded-4xl hover:bg-red-600">
        Reset
      </button>
    
    </div>
    </div>
  );
}

