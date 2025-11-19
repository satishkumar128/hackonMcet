import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI learning assistant. How can I help you today? 😊",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Skill-related queries
    if (lowerMessage.includes('skill') || lowerMessage.includes('gap') || lowerMessage.includes('weak')) {
      return "I can help you analyze your skills! Based on your profile, you should focus on Mathematics (especially Algebra) and Art fundamentals. Would you like me to recommend specific resources or create a study plan?";
    }

    // Study streak and consistency
    if (lowerMessage.includes('streak') || lowerMessage.includes('consistent') || lowerMessage.includes('study time')) {
      return "Great question about consistency! You currently have a 7-day study streak 🔥. To maintain it, try to study at least 30 minutes daily. Would you like tips on building better study habits?";
    }

    // Peer matching
    if (lowerMessage.includes('peer') || lowerMessage.includes('partner') || lowerMessage.includes('friend') || lowerMessage.includes('study group')) {
      return "I can help you find the perfect study partners! Based on your skills and interests, I recommend connecting with Sarah Martinez (95% match) for programming, or Alex Chen (88% match) for mathematics. Want me to send them a connection request?";
    }

    // Resources and learning materials
    if (lowerMessage.includes('resource') || lowerMessage.includes('learn') || lowerMessage.includes('course') || lowerMessage.includes('video')) {
      return "I have personalized learning resources for you! For your priority subject (Mathematics), I recommend 'Algebra Fundamentals: Solving Equations' and 'Calculus Made Easy: Derivatives'. Would you like me to bookmark these for you?";
    }

    // Goals and planning
    if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('schedule')) {
      return "Let's create a study plan! I suggest: 1) 30 min daily on Algebra practice, 2) Join the Math Problem Solvers study group, 3) Complete 2 programming challenges weekly. Does this sound good?";
    }

    // Motivation and encouragement
    if (lowerMessage.includes('motivat') || lowerMessage.includes('tired') || lowerMessage.includes('difficult') || lowerMessage.includes('hard')) {
      return "I understand learning can be challenging! Remember, you've already maintained a 7-day streak and improved in multiple subjects. Every small step counts. Would you like some study tips or a quick break activity?";
    }

    // Progress tracking
    if (lowerMessage.includes('progress') || lowerMessage.includes('improve') || lowerMessage.includes('better')) {
      return "Your progress is impressive! You've improved your Programming skills to 88% and Science to 82%. Your consistency tracker shows steady growth. Keep up the great work! Want to see detailed analytics?";
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help with your learning journey. You can ask me about your skills, study plans, finding peers, or learning resources. What would you like to know?";
    }

    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm always here to help. Feel free to ask me anything about your learning journey. Keep up the great work! 🌟";
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return "I can assist you with:\n• Analyzing your skill gaps\n• Creating study plans\n• Finding study partners\n• Recommending learning resources\n• Tracking your progress\n• Providing motivation and tips\n\nWhat would you like help with?";
    }

    // Default response
    const defaultResponses = [
      "That's an interesting question! Could you tell me more about what you'd like to learn or improve?",
      "I'm here to help! Are you looking for study resources, peer connections, or skill analysis?",
      "Let me help you with that! Would you like recommendations for resources, study partners, or a personalized learning plan?",
      "Great question! I can help you with skills analysis, consistency tracking, or finding study partners. Which interests you most?",
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: '📊 Analyze my skills', message: 'Can you analyze my skills?' },
    { label: '🔥 Check my streak', message: 'How is my study streak?' },
    { label: '👥 Find study partners', message: 'Help me find study partners' },
    { label: '📚 Recommend resources', message: 'What resources should I study?' },
  ];

  const handleQuickAction = (message: string) => {
    setInputValue(message);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col border-2 border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Learning Assistant</CardTitle>
                  <p className="text-xs text-indigo-100">Always here to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                          : 'bg-gradient-to-r from-purple-100 to-indigo-100'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.message)}
                      className="text-xs h-auto py-2 px-2 whitespace-normal text-left justify-start"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}