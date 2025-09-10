import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MessageCircle, Phone, Mail, HelpCircle, Book } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LiveChat } from '@/components/LiveChat';

const HelpCenter = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const faqs = [
    {
      question: "How long does a typical repair take?",
      answer: "Most smartphone repairs take 30-60 minutes, while laptop repairs may take 2-4 hours depending on complexity."
    },
    {
      question: "Do you provide warranty on repairs?",
      answer: "Yes, we provide 90-day warranty on all repairs using genuine parts."
    },
    {
      question: "Can I track my repair status?",
      answer: "Absolutely! You can track your repair in real-time through our website or mobile app."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash, UPI, credit/debit cards, and all major digital payment methods."
    }
  ];

  const handleLiveChatClick = () => {
    setIsChatOpen(true);
  };

  const handleCallSupport = () => {
    window.open('tel:1800-RESTORE', '_self');
  };

  const handleEmailSupport = () => {
    window.open('mailto:support@restorely.com', '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">Find answers to your questions or get in touch with our support team</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              placeholder="Search for help topics..."
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card 
            className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleLiveChatClick}
          >
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with our support team instantly</CardDescription>
            </CardHeader>
          </Card>
          
          <Card 
            className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleCallSupport}
          >
            <CardHeader>
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Call Support</CardTitle>
              <CardDescription>1800-RESTORE (24/7)</CardDescription>
            </CardHeader>
          </Card>
          
          <Card 
            className="text-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleEmailSupport}
          >
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Email Us</CardTitle>
              <CardDescription>support@restorely.com</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
      
      <LiveChat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default HelpCenter;
