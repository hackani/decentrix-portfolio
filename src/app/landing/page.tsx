"use client"
import Image from "next/image";
import siteData from "@/data/siteData.json";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingShapes from "@/components/FloatingShapes";
import ParallaxSection from "@/components/ParallaxSection";
import { motion } from "framer-motion";
import ScrollableProjects from '@/components/ScrollableProjects';
import ScrollableTeam from '@/components/ScrollableTeam';
import { useState } from "react";
import { ContactFormData, ContactFormStatus } from "@/types/contact";
import Link from "next/link";

export default function LandingPage() {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  
  // Form status
  const [formStatus, setFormStatus] = useState<ContactFormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    error: ""
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: "Please fill in all fields"
      });
      return;
    }
    
    try {
      setFormStatus({
        isSubmitting: true,
        isSubmitted: false,
        error: ""
      });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Success
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: ""
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  };
  
  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={siteData.company.logo}
                alt={siteData.company.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-800">{siteData.company.name}</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors">Projects</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
              <Link 
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <AnimatedBackground />
        <FloatingShapes />
        <div className="container mx-auto px-4 z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">{siteData.hero.title}</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">{siteData.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href={siteData.hero.cta.href}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {siteData.hero.cta.text}
              </motion.a>
              <Link 
                href="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Client Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <ParallaxSection image={siteData.about.parallaxBg}>
        <div className="py-20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-4 text-white">{siteData.about.title}</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">{siteData.about.subtitle}</h3>
                <p className="text-gray-300 mb-6">{siteData.about.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {siteData.about.stats.map((stat, index) => (
                    <motion.div 
                      key={index} 
                      className="p-4 bg-white/10 backdrop-blur-lg rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-bold text-xl text-blue-400">{stat.number}</h4>
                      <p className="text-gray-300">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                className="relative h-[400px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={siteData.about.image}
                  alt="About SiteCrafters"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">{siteData.services.title}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.services.items.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">{siteData.projects.title}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <ScrollableProjects projects={siteData.projects.items} />
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
          <ScrollableTeam members={siteData.team.members} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            {formStatus.isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We will get back to you soon.</p>
                <button
                  onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {formStatus.error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {formStatus.error}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-32"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className={`bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors ${
                      formStatus.isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                  >
                    {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src={siteData.company.logo}
                  alt={siteData.company.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <span className="text-xl font-bold">{siteData.company.name}</span>
              </div>
              <p className="text-gray-400">{siteData.company.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {siteData.footer.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {siteData.footer.services.map((service, index) => (
                  <li key={index} className="text-gray-400">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>{siteData.footer.contactInfo.email}</p>
                <p>{siteData.footer.contactInfo.phone}</p>
                <p className="text-sm">{siteData.footer.contactInfo.address}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteData.company.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


