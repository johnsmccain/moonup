// import React from 'react';
import { Rocket } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="mt-20 flex items-center justify-center  pt-16">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
          TO THE MOON 🚀
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Where memes meet dreams and rockets never stop
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 transition-colors">
            <Rocket className="w-5 h-5" />
            Launch App
          </button>
        </div>
      </div>
    </section>
  );
}