import Image from "next/image";
import { Rocket, Target, Share2, Send } from "lucide-react";
import BackButton from "@/components/Button";

const marketingPortfolio = [
    {
        title: "Branding",
        image: "/branding.jpg",
        description: "Crafting unique brand identities that resonate and differentiate.",
        icon: Rocket
    },
    {
        title: "Advertising",
        image: "/advertising.jpg",
        description: "Strategic ad campaigns that capture attention and drive conversions.",
        icon: Target
    },
    {
        title: "Social Media",
        image: "/social-media.jpg",
        description: "Engaging social media management and content strategies.",
        icon: Share2
    },
    {
        title: "Flyer Distribution",
        image: "/flyer.jpg",
        description: "Targeted offline marketing to reach local and regional audiences.",
        icon: Send
    },
];

export default function Marketing() {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6 flex flex-col items-center">
            <BackButton />

            <div className="max-w-6xl w-full text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Elevate Your Brand with Our Marketing Solutions
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                    Our tailored marketing strategies help businesses build brand authority, engage audiences, and drive sales effectively.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                {marketingPortfolio.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            key={index}
                            className="bg-white group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
                        >
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                    <IconComponent className="text-white opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" size={48} />
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="flex items-center justify-center mb-3">
                                    <IconComponent className="mr-3 text-blue-500" size={24} />
                                    <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
                                </div>
                                <p className="text-gray-600 text-md leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
