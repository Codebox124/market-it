import Image from "next/image";

import { Rocket, Target, Share2, Send } from "lucide-react";
import BackButton from "@/components/Button";

const marketingPortfolio = [
  { 
    title: "Branding", 
    image: "/branding.jpg",
    description: "Crafting unique brand identities that resonate and differentiate",
    icon: Rocket
  },
  { 
    title: "Advertising", 
    image: "/advertising.jpg",
    description: "Strategic ad campaigns that capture attention and drive conversions",
    icon: Target
  },
  { 
    title: "Social Media", 
    image: "/social-media.jpg",
    description: "Engaging social media management and content strategies",
    icon: Share2
  },
  { 
    title: "Flyer Distribution", 
    image: "/flyer.jpg",
    description: "Targeted offline marketing to reach local and regional audiences",
    icon: Send
  },
];

export default function Marketing() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <BackButton />
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Our Marketing Solutions
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive marketing strategies designed to amplify your brand's reach and impact
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {marketingPortfolio.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div className="relative h-56 w-full">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdCIFhZWiAAAAAAAAAAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAAHRyWFlaAAABZAAAABRnWFhaAAABeAAAABRiWFlaAAABjAAAABRyVFJDAAABoAAAAChnVFJDAAABoAAAAChiVFJDAAABoAAAACh3dHB0AAAByAAAABRjcHJ0AAAB3AAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAFgAAAAcAHMAUgBHAEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z3BhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABYWVogAAAAAAAA9tYAAQAAAADTLW1sdWMAAAAAAAAAAQAAAAxlblVTAAAAIAAAABwARwBvAG8AZwBsAGUAIABJAG4AYwAuACAAMgAwADEANv/bAEMAFA4PEg8NFBIQEhcVFBgeMiEeHBwZH0MjJSROSUFKSEpKSE1CZGFnXVd4enWCgoiTkpOdhpmmtrq6s3CIhNCw1P/bAEMBFRcXHhoeNyEhNMJCQkLExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExP/AABEIAAYACAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlgAH/9k="
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <IconComponent className="text-white opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300" size={48} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <IconComponent className="mr-3 text-blue-500" size={24} />
                    <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}