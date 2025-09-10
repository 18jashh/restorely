
import React from 'react';
import { Wrench, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Wrench className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-2xl font-bold">Restorely</span>
            </div>
            <p className="text-gray-400 mb-4">
              Professional device repair services at your doorstep. Trusted, reliable, and convenient.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/smartphone-repair')}>
                Smartphone Repair
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/laptop-repair')}>
                Laptop Repair
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/tablet-repair')}>
                Tablet Repair
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/audio-repair')}>
                Audio Devices
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/ai-assistant')}>
                AI Assistant
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/help-center')}>
                Help Center
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/track-repair')}>
                Track Repair
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/help-center')}>
                Warranty
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/help-center')}>
                Contact Us
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => handleNavigation('/help-center')}>
                Terms & Conditions
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>1800-RESTORE</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>support@restorely.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>Available nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons - Centered */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex justify-center space-x-6 mb-4">
            <Facebook className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Twitter className="h-6 w-6 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Restorely. All rights reserved. Built with ❤️ for device care.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
