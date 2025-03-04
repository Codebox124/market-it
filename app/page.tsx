import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
        
        {/* Left Side - Content */}
        <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <header>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                MAKE IT & MARKET
              </h1>
              <div className="bg-blue-50 text-blue-600 text-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                Creative Solutions
              </div>
            </div>
            <p className="text-gray-500 text-base sm:text-lg border-t pt-3 border-gray-200">
              Elevating Brands | Driving Growth
            </p>
          </header>

          <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
            We transform your vision into powerful visual and marketing strategies that drive meaningful business results.
          </p>

          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-2 sm:mr-3" size={20} />
              <span className="text-sm sm:text-base">Comprehensive Visual Production</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Check className="text-green-500 mr-2 sm:mr-3" size={20} />
              <span className="text-sm sm:text-base">Strategic Marketing Solutions</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/visuals" 
              className="group block p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">VISUALS</h2>
                <ArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                Creative visual solutions that tell your story
              </p>
            </Link>

            <Link 
              href="/marketing" 
              className="group block p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">MARKETING</h2>
                <ArrowRight className="text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                Strategic campaigns that drive results
              </p>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Section */}
        <div 
          className="w-full h-64 md:h-auto bg-cover bg-center md:block hidden"
          style={{
            backgroundImage: 'url("/hero.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        />
      </div>
    </div>
  );
}
