import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteData from "@/data/siteData.json";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteData.metadata.title,
  description: siteData.metadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <img 
                  src={siteData.company.logo} 
                  alt={`${siteData.company.name} Logo`} 
                  className="h-8 w-8 rounded-full"
                />
              <div className="text-2xl font-bold text-blue-600">{siteData.company.name}</div>
              </div>
              <div className="hidden md:flex space-x-8">
                {siteData.navigation.map((item) => (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{siteData.company.name}</h3>
                <p className="text-gray-400">{siteData.company.description}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  {siteData.footer.quickLinks.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="hover:text-blue-400 transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  {siteData.footer.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>{siteData.footer.contactInfo.email}</li>
                  <li>{siteData.footer.contactInfo.phone}</li>
                  <li>{siteData.footer.contactInfo.address}</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} {siteData.company.name}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
