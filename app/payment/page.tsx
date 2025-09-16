'use client';
import { CreditCard, Shield, CheckCircle, ExternalLink } from 'lucide-react';

export default function PaymentPage() {
    const handlePayPalPayment = () => {
        window.open('https://www.paypal.com/ncp/payment/VUN5CLMUKR8GE', '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br pt-30 md:pt-40 from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-4">
                    {/* Security Notice */}
                    <div className="flex items-center justify-center mb-8 p-4 bg-green-50 rounded-lg">
                        <Shield className="h-6 w-6 text-green-500 mr-2" />
                        <span className="text-sm font-medium text-green-700">
                            Secure payment powered by PayPal
                        </span>
                    </div>

                    {/* Service Details */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                            Your Purchase
                        </h2>

                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <div className="flex items-start">
                                <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        Creative Services & Strategic Marketing
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Premium creative services and strategic marketing solutions for businesses, artists, and visionaries.
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Graphic Design
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Video Editing
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Photo Editing
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Animation
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Website Design
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Advertising Campaigns
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Social Media Management
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Flyer Distribution
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                            Choose Your Payment Method
                        </h3>

                        {/* PayPal Option */}
                        <button
                            onClick={handlePayPalPayment}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center group"
                        >
                            <CreditCard className="h-5 w-5 mr-2" />
                            Pay with PayPal
                            <ExternalLink className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Alternative Payment Note */}
                        <div className="text-center py-4">
                            <p className="text-sm text-gray-500 mb-2">
                                PayPal accepts all major credit cards and debit cards
                            </p>
                            <div className="flex justify-center space-x-2 text-xs text-gray-400">
                                <span>Visa</span>
                                <span>•</span>
                                <span>Mastercard</span>
                                <span>•</span>
                                <span>American Express</span>
                                <span>•</span>
                                <span>Discover</span>
                            </div>
                        </div>
                    </div>

                    {/* What Happens Next */}
                    <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            What happens next?
                        </h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">1</span>
                                <span>Click "Pay with PayPal" to complete your secure payment</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">2</span>
                                <span>You'll receive a confirmation email and project details form</span>
                            </div>
                            <div className="flex items-start">
                                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">3</span>
                                <span>We'll begin work on your creative project within 24-48 hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Security Footer */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <div className="flex items-center justify-center text-sm text-gray-500 mb-2">
                            <Shield className="h-4 w-4 mr-1" />
                            Your payment is protected by PayPal's Buyer Protection
                        </div>
                        <p className="text-xs text-gray-400">
                            Questions? Contact us at support@makeitandmarket.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}