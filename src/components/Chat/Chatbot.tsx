import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const Chatbot: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  // FAQ responses (offline fallback)
  const faqResponses: Record<string, string> = {
    'how to fill form': 'To fill a form on ExamVector: 1) Click "Start Form" 2) Fill all required fields 3) Upload documents if needed 4) Give DPDP consent 5) Submit. Your data is saved offline and syncs automatically.',
    'offline': 'ExamVector works offline! Your form data is saved locally in your browser using IndexedDB. When you reconnect to the internet, everything syncs automatically.',
    'blockchain': 'We use blockchain technology to create tamper-proof audit trails. Every form submission gets a unique transaction hash on Ethereum testnet, ensuring transparency and security.',
    'dpdp': 'DPDP (Digital Personal Data Protection) Act ensures your data privacy. We encrypt data, store it in India, get explicit consent, and you can access/delete your data anytime.',
    'receipt': 'After submitting, you get a digital receipt with: Form ID, Transaction Hash, Timestamp, and downloadable PDF. You can access it anytime from your dashboard.',
    'mobile': 'Yes! ExamVector is a Progressive Web App (PWA). You can install it like a native app and use it offline on any device.',
    'languages': 'ExamVector supports English, Hindi, and regional languages. Use the language selector in the top navigation.',
    'cost': 'Pricing: ₹2-₹5 per form (SaaS), ₹2-₹10L per year (white-label), ₹15-₹50L per year (enterprise). Contact us for institutional pricing.'
  }

  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const message = userMessage.toLowerCase()
    
    // Check for FAQ matches
    for (const [key, response] of Object.entries(faqResponses)) {
      if (message.includes(key)) {
        return response
      }
    }

    // Default responses
    if (message.includes('hello') || message.includes('hi')) {
      return `Hello! I'm your ExamVector assistant. I can help with form filling, offline features, DPDP compliance, and more. What would you like to know?`
    }

    if (message.includes('help')) {
      return `I can help you with:
• How to fill forms
• Offline functionality
• Blockchain audit trails
• DPDP compliance
• Download receipts
• Mobile app features
• Pricing information

Just ask me anything!`
    }

    return `I understand you're asking about "${userMessage}". While I'm designed to help with ExamVector questions, I might not have all the answers yet. Please contact our support team at support@examvector.com for detailed assistance.`
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const botResponse = await getBotResponse(inputValue)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again or contact support.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold">ExamVector Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-200 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-8">
                <Bot className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p>Hello! I'm here to help with your ExamVector questions.</p>
                <p className="mt-1">Ask me about forms, offline features, or DPDP compliance!</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}