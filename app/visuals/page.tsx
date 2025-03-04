import BackButton from "@/components/Button";
import { Eye } from "lucide-react";
import Image from "next/image";

const visualsPortfolio = [
  { 
    title: "Video Editing", 
    image: "/video-editing.jpg",
    description: "Cinematic storytelling through professional video post-production."
  },
  { 
    title: "Photo Editing", 
    image: "/photo-editing.jpg",
    description: "Precision retouching and creative image enhancement."
  },
  { 
    title: "Graphic Design", 
    image: "/graphic-design.jpg",
    description: "Innovative visual communication and brand identity design."
  },
  { 
    title: "Website Design", 
    image: "/website-design.jpg",
    description: "Responsive, user-centric web experiences that convert."
  },
];

export default function Visuals() {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <BackButton />
        </div>

        <header className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Our <span className="text-blue-500">Visuals Portfolio</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Transforming ideas into stunning visual experiences across multiple mediums.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {visualsPortfolio.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <div className="relative h-64 w-full">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSk..."
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Eye className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" size={48} />
                </div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
                <p className="mt-2 text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
