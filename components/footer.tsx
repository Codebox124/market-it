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
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Link href="/" className="text-white  font-bold text-2xl">
              <span className="text-green-400">Make It</span>
              <span className="text-white px-4">&</span>
              <span className="text-blue-400">Market</span>
            </Link>

            <p className="mt-4 text-gray-400 ">
              We provide full-service visuals and marketing solutions to help
              you achieve your goals.
            </p>

          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/visuals"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  Visual Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Marketing Strategies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Branding
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Web Design
                </Link>
              </li>
            </ul>
          </div>

          <div id="contact">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <a
                  href="mailto:info@makeitmarket.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@makeitmarket.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-400" />
                <a
                  href="tel:347 659 1708"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  (347) 659 1708
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 text-blue-400" />
                <span className="text-gray-400">
                  Worldwide
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Make It & Market. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
