import Link from "next/link";
import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 py-16 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="text-gray-900 font-bold text-2xl">
              <span className="text-green-600">Make <span className="">It </span></span>
              <span className="text-gray-800">&</span>
              <span className="text-blue-600"> Market</span>
            </Link>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We provide full-service visuals and marketing solutions to help
              you achieve your goals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/visuals/graphic-design"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/video-editing"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Video Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/photo-editing"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Photo Editing
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/animation"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Animation
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/website-design"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Websites
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/advertising"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Advertising
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/social-media"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Social Media
                </Link>
              </li>
              <li>
                <Link
                  href="/visuals/flyer-distribution"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                >
                  Flyer Distribution
                </Link>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:makeitmarketit@gmail.com"
                  className="text-gray-600 hover:text-gray-900 hover:text-blue-600 transition-colors duration-200"
                >
                  makeitmarketit@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-500 flex-shrink-0" />
                <a
                  href="tel:347 659 1708"
                  className="text-gray-600 hover:text-gray-900 hover:text-green-600 transition-colors duration-200"
                >
                  (347) 659 1708
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-500 flex-shrink-0" />
                <span className="text-gray-600">
                  Worldwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Make It & Market. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}