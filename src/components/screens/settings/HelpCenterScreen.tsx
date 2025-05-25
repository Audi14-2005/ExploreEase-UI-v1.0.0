
import React, { useState } from 'react';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface HelpCenterScreenProps {
  onBack: () => void;
}

const HelpCenterScreen = ({ onBack }: HelpCenterScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      questions: [
        {
          question: 'How do I create my first trip?',
          answer: 'To create your first trip, go to the Routes tab and tap the "+" button. Enter your destination, select dates, and add any stops or activities you want to include.'
        },
        {
          question: 'How do I add friends to my travels?',
          answer: 'You can add friends by going to the Profile section and tapping "Add Friends". You can search by username or email, or invite them via link.'
        },
        {
          question: 'How do I track my expenses?',
          answer: 'Use the Expenses tab to log all your travel costs. You can categorize expenses, add receipts by taking photos, and split costs with travel companions.'
        }
      ]
    },
    {
      title: 'Account & Settings',
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Privacy & Security > Change Password. You\'ll need to enter your current password and then create a new one.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Account deletion can be requested by contacting our support team. Note that this action is irreversible and will delete all your travel data.'
        },
        {
          question: 'How do I manage my privacy settings?',
          answer: 'Visit Settings > Privacy & Security to control who can see your profile, travel history, and other personal information.'
        }
      ]
    },
    {
      title: 'Payments & Billing',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.'
        },
        {
          question: 'How do I update my payment information?',
          answer: 'Go to Settings > Payment Methods to add, remove, or update your saved payment information.'
        },
        {
          question: 'Can I get a refund?',
          answer: 'Refund policies vary depending on the service. Please check the specific terms for your booking or contact support for assistance.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      available: true
    },
    {
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      icon: Phone,
      action: 'Call Now',
      available: true
    },
    {
      title: 'Email Support',
      description: 'support@exploreease.com',
      icon: Mail,
      action: 'Send Email',
      available: true
    }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold">Help Center</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Contact Options */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Contact Support
          </h3>
          <div className="grid gap-3">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <button
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{option.title}</p>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {option.available && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                    <span className="text-sm font-medium text-blue-600">{option.action}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Sections */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Frequently Asked Questions
          </h3>
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">{category.title}</h4>
              <div className="bg-white rounded-xl overflow-hidden">
                <Accordion type="single" collapsible>
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="px-4 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Additional Resources
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-800">User Guide</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-800">Community Forum</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors">
              <span className="font-medium text-gray-800">Video Tutorials</span>
              <ExternalLink size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterScreen;
