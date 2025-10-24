import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking - Make It & Market",
  description: "Complete your payment and secure our marketing services easily.",
  openGraph: {
    title: "Booking - Make It & Market",
    description: "Secure and easy payment page for our services.",
  },
  twitter: {
    title: "Booking - Make It & Market",
    description: "Complete your payment safely and quickly.",
  },
};

export default function BookingPage() {
  return (
    <div className="min-h-screen text-white">
      <main className="mt-10 pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-blue-600">
              Complete Your Payment
            </h1>
            <p className="text-gray-400 text-lg">
              Effective marketing solutions and versatile creative services
            </p>
          </div>

          {/* Payment Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            {/* Card Content */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Secure Payment</h3>
                  <p className="text-gray-400 text-sm">Protected by PayPal</p>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Click the button below to proceed with your secure payment
                  through PayPal. You'll be redirected to complete your
                  transaction safely.
                </p>

                {/* PayPal Button */}
                <a
                  href="http://www.paypal.com/ncp/payment/VUN5CLMUKR8GE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 text-center text-lg shadow-lg hover:shadow-blue-600/50"
                >
                  Pay with PayPal
                </a>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>Secure encrypted payment</span>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-sm text-gray-400">Secure Checkout</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm text-gray-400">Instant Processing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✓</div>
                <p className="text-sm text-gray-400">Buyer Protection</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
