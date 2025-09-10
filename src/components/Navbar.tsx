
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Wrench, Phone, User, Store, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Services', href: '#services' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Shop', href: '/shop', icon: Store },
    { name: 'Service Centers', href: '/service-centers', icon: MapPin },
    { name: 'Technicians', href: '/technicians', icon: Users }
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // Scroll to section if on home page
      if (window.location.pathname === '/home' || window.location.pathname === '/') {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home page then scroll
        navigate('/home');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(href);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/home')}>
            <Wrench className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Restorely</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </button>
            ))}
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-blue-600" />
              <span className="text-gray-700 font-medium">1800-RESTORE</span>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button 
              onClick={() => navigate('/book')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Book Repair
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center space-x-2 w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </button>
              ))}
              <div className="flex items-center px-3 py-2 space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-700">1800-RESTORE</span>
              </div>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate('/book');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Book Repair
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
