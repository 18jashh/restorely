
import React, { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Start fade-out animation
      setIsVisible(false);
      
      // Wait for animation to complete, then redirect
      setTimeout(() => {
        onComplete();
        navigate('/login');
      }, 500); // 500ms for fade-out animation
    }, 2500); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete, navigate]);

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center z-50 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
    }`}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-6 animate-pulse">
          <Wrench className="h-20 w-20 text-white animate-spin" style={{ animationDuration: '2s' }} />
        </div>
        
        <div className="animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4">Restorely</h1>
          <p className="text-xl text-blue-100 font-medium">
            Smart Tech Repair at Your Doorstep
          </p>
        </div>
        
        <div className="mt-8">
          <div className="w-48 h-1 bg-blue-300 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse w-0 animate-[loading_2.5s_ease-in-out_forwards]"></div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
