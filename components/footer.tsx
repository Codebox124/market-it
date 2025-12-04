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
              <span className="text-green-600">
                Make <span className="">It </span>
              </span>
              <span className="text-gray-800">&</span>
              <span className="text-blue-600"> Market</span>
            </Link>

            <p className="mt-4 text-gray-600 leading-relaxed">
              We provide full-service visuals and marketing solutions to help
              you achieve your goals.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail
                    size={18}
                    className="mr-2 text-blue-500 flex-shrink-0"
                  />
                  <a
                    href="mailto:makeitmarketit@gmail.com"
                    className="text-gray-600 hover:text-gray-900 hover:text-blue-600 transition-colors duration-200"
                  >
                    info@makeitandmarket.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone
                    size={18}
                    className="mr-2 text-green-500 flex-shrink-0"
                  />
                  <a
                    href="tel:347 659 1708"
                    className="text-gray-600 hover:text-gray-900 hover:text-green-600 transition-colors duration-200"
                  >
                    (347)<span className="[word-spacing:-0.35em]"> 659</span>
                    <span className="[word-spacing:-0.2em]"> 1708</span>
                  </a>
                </li>
                <li className="flex items-start">
                  <MapPin
                    size={18}
                    className="mr-2 mt-1 text-blue-500 flex-shrink-0"
                  />
                  <span className="text-gray-600">Worldwide</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Our Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <Link
                  href="/visuals"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-bold mb-0.5"
                >
                  Visual:
                </Link>
                <ul className="space-y-0 grid grid-cols-1 gap-2 py-2">
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
                </ul>
              </div>
              <div className="mt-5 md:mt-0">
                <Link
                  href="/marketing"
                  className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200 font-bold mb-0.5 pt-2"
                >
                  Marketing:
                </Link>
                <ul className="space-y-0 grid grid-cols-1 gap-2 py-2">
                  <li>
                    <Link
                      href="/marketing/advertising"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Advertising
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketing/social-media"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Social Media
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketing/flyer-distribution"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Flyer Distribution
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/marketing/websites-apps"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Websites/Apps
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div id="contact">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Language
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <ul className="space-y-0 grid grid-cols-1 gap-2 py-2">
                  <li>
                    <Link
                      href="/en"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      English
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ar"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Arabic
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bn"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Bengali
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="hk"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Cantonese
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/fr"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      French
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gu"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Gujarati
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/hi"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Hindi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/id"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Indonesian
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-0 grid grid-cols-1 gap-2 py-2">
                  <li>
                    <Link
                      href="/zh"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Mandarin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ja"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Japanese
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ko"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Korean
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pt"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Portuguese
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/es"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Spanish
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/tl"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Tagalog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ur"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Urdu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ru"
                      className="text-gray-600 hover:text-gray-900 hover:text-emerald-600 transition-colors duration-200"
                    >
                      Russian
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
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
