"use client"
import { motion } from 'framer-motion';

interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  cta: {
    text: string;
    href: string;
  };
}

interface PricingProps {
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

export default function Pricing({ title, subtitle, plans }: PricingProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                ...fadeInUp,
                visible: { ...fadeInUp.visible, transition: { ...fadeInUp.visible.transition, delay: index * 0.1 } }
              }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}<span className="text-lg font-normal text-gray-500">/project</span></p>
              <ul className="space-y-4 text-gray-600 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.cta.href}
                className="bg-blue-600 text-white text-center px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                {plan.cta.text}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
