
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bot, 
  User, 
  Send, 
  ArrowLeft, 
  Mic, 
  Image as ImageIcon, 
  Phone,
  MessageCircle,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI repair assistant. I can help diagnose device issues, provide troubleshooting steps, or connect you with a human technician. What device are you having trouble with?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "My phone won't charge",
        "Laptop is running slowly",
        "Tablet screen is cracked",
        "Headphones not connecting"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('charge') || lowerMessage.includes('battery')) {
      return "I can help with charging issues! Here are some common solutions:\n\n1. **Check the charging cable** - Try a different cable\n2. **Clean the charging port** - Use compressed air to remove debris\n3. **Try a different power source** - Test with another wall outlet\n4. **Restart your device** - A simple reboot can resolve charging glitches\n\nIf none of these work, the issue might be hardware-related. Would you like me to book a technician visit?";
    }
    
    if (lowerMessage.includes('slow') || lowerMessage.includes('performance')) {
      return "Slow performance can be frustrating! Let's try these steps:\n\n1. **Restart your device** - Clears temporary files and memory\n2. **Close unused apps** - Too many apps can slow things down\n3. **Check storage space** - Free up at least 10% of your storage\n4. **Update your software** - Latest updates often improve performance\n5. **Run a malware scan** - Especially important for computers\n\nTry these steps and let me know if you need further assistance!";
    }
    
    if (lowerMessage.includes('screen') || lowerMessage.includes('crack')) {
      return "Sorry to hear about your screen damage! Unfortunately, cracked screens usually require professional repair. Here's what I recommend:\n\n**Immediate steps:**\n1. Apply a screen protector to prevent further damage\n2. Back up your data immediately\n3. Avoid pressing on the cracked area\n\n**For repair:**\nScreen replacement is a delicate procedure that requires professional tools and expertise. I'd be happy to connect you with one of our certified technicians.\n\nWould you like me to book a repair appointment for you?";
    }
    
    if (lowerMessage.includes('connect') || lowerMessage.includes('bluetooth') || lowerMessage.includes('wifi')) {
      return "Connection issues can be tricky! Let's troubleshoot step by step:\n\n**For Bluetooth:**\n1. Turn Bluetooth off and on again\n2. Forget the device and re-pair\n3. Reset network settings (if available)\n\n**For WiFi:**\n1. Restart your router and device\n2. Forget and reconnect to the network\n3. Check if other devices can connect\n4. Move closer to the router\n\nIf these don't work, there might be a hardware issue. Should I schedule a diagnostic appointment?";
    }
    
    return "I understand you're experiencing some technical difficulties. While I can help with basic troubleshooting, your specific issue might require a more detailed diagnosis.\n\nI can:\n✅ Schedule you with a human support specialist\n✅ Book a technician visit\n✅ Provide more specific troubleshooting steps\n\nWhat would be most helpful for you right now?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date(),
        suggestions: ['Book a technician', 'Try more troubleshooting', 'Speak to human support', 'Start over']
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">AI Repair Assistant</h1>
                <p className="text-sm text-green-600">Online • Ready to help</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/book')}
              >
                Book Repair
              </Button>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Support
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col">
        <Card className="flex-1 flex flex-col">
          {/* Chat Messages */}
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-4 ${
                      message.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-3 max-w-2xl">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-4 bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-2xl ml-11">
                    <p className="text-sm text-gray-500 mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {messages[messages.length - 1].suggestions?.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-sm"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe your device issue..."
                  className="pr-20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center mt-3 space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4" />
                <span>Powered by AI</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>Need human help? Just ask!</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;
