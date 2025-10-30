"use client"
import DashboardLayout from "@/components/DashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { motion } from "framer-motion";
import siteData from "@/data/siteData.json";

export default function DashboardPricing() {

  return (
    <ProtectedRoute>
      <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{siteData.pricing.title}</h1>
          <p className="text-xl text-gray-600">{siteData.pricing.subtitle}</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {siteData.pricing.plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white rounded-lg shadow-lg border-2 p-8 ${
                plan.popular ? 'border-blue-600 transform scale-105' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">SEO Optimization</h3>
                  <p className="text-sm text-gray-600">Improve your search engine rankings</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$299/month</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Maintenance & Support</h3>
                  <p className="text-sm text-gray-600">Ongoing website maintenance</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$199/month</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Content Management</h3>
                  <p className="text-sm text-gray-600">Regular content updates</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$149/month</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Performance Optimization</h3>
                  <p className="text-sm text-gray-600">Speed and performance improvements</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$399</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Security Audit</h3>
                  <p className="text-sm text-gray-600">Comprehensive security assessment</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$599</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Custom Development</h3>
                  <p className="text-sm text-gray-600">Tailored solutions for unique needs</p>
                </div>
                <span className="text-lg font-bold text-blue-600">$150/hour</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="bg-white rounded-lg shadow-md border border-gray-200 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">What&lsquo;s included in the pricing?</h3>
              <p className="text-gray-600">All plans include design, development, testing, deployment, and initial support. Additional services are available separately.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">How long does development take?</h3>
              <p className="text-gray-600">Typical timelines are 2-4 weeks for Starter, 4-8 weeks for Professional, and 8-16 weeks for Enterprise plans.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Do you provide ongoing support?</h3>
              <p className="text-gray-600">Yes, all plans include initial support. We also offer monthly maintenance packages for ongoing support and updates.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan later?</h3>
              <p className="text-gray-600">Absolutely! You can upgrade to a higher plan at any time. We&lsquo;ll prorate the difference and migrate your project seamlessly.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, bank transfers, and PayPal. Payment terms can be discussed for larger projects.</p>
            </div>
          </div>
        </motion.div>
      </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

