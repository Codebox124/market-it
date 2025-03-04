import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ href = "/" }) {
  return (
    <Link 
      href={href} 
      className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm shadow-md rounded-full p-2 group flex items-center justify-center hover:bg-gray-100 transition-all"
    >
      <ArrowLeft className="text-gray-700 group-hover:-translate-x-0.5 transition-transform" size={24} />
      <span className="sr-only">Back to Home</span>
    </Link>
  );
}