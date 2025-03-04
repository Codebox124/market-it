import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/hero.jpg")' }}>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Elevate Your Brand <br /> With <span className="text-green-400">Strategic Design</span> & <span className="text-blue-400">Marketing</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          We craft compelling visuals and data-driven marketing strategies that amplify your brand’s success.
        </p>
        
        {/* Services Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-6">
          <Link 
            href="/visuals" 
            className="group inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-green-400 hover:text-white transition-all"
          >
            Visual Solutions <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/marketing" 
            className="group inline-flex items-center px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition-all"
          >
            Marketing Strategies <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
