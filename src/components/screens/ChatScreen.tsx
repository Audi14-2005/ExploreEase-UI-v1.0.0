
import React, { useState } from 'react';
import { Send, Users, User, Plus, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const ChatScreen = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: '1',
      type: 'group',
      name: 'Travel Buddies',
      lastMessage: 'Anyone up for hiking this weekend?',
      timestamp: '2m ago',
      unread: 2,
      avatar: '🏔️',
      members: 5
    },
    {
      id: '2',
      type: 'direct',
      name: 'Sarah M.',
      lastMessage: 'The photos from our trip look amazing!',
      timestamp: '1h ago',
      unread: 0,
      avatar: '👩‍💼'
    },
    {
      id: '3',
      type: 'group',
      name: 'Europe Explorers',
      lastMessage: 'Check out this restaurant in Paris',
      timestamp: '3h ago',
      unread: 1,
      avatar: '🇪🇺',
      members: 12
    },
    {
      id: '4',
      type: 'direct',
      name: 'John D.',
      lastMessage: 'Thanks for the route suggestions!',
      timestamp: '1d ago',
      unread: 0,
      avatar: '👨‍💻'
    }
  ];

  // Mock messages for active chat
  const messages = [
    {
      id: '1',
      sender: 'Sarah M.',
      content: 'Hey! How was your trip to the mountains?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: user?.username || 'You',
      content: 'It was incredible! The views were breathtaking. I got some amazing photos.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      sender: 'Sarah M.',
      content: 'I can\'t wait to see them! We should plan our next adventure soon.',
      timestamp: '10:35 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeChat) {
    const chat = conversations.find(c => c.id === activeChat);
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveChat(null)}
                className="p-2"
              >
                ←
              </Button>
              <div className="text-2xl">{chat?.avatar}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{chat?.name}</h3>
                {chat?.type === 'group' && (
                  <p className="text-xs text-gray-500">{chat.members} members</p>
                )}
                {chat?.type === 'direct' && (
                  <p className="text-xs text-gray-500">Online</p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical size={18} />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  msg.isOwn
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {!msg.isOwn && (
                  <p className="text-xs font-medium mb-1">{msg.sender}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <Button size="sm" className="flex items-center space-x-1">
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setActiveChat(conversation.id)}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-white cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                  {conversation.avatar}
                </div>
                {conversation.type === 'group' && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Users size={12} className="text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-800 truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {conversation.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
            
            {conversation.unread > 0 && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ml-2">
                <span className="text-xs text-white font-medium">
                  {conversation.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Users size={16} />
            <span>Create Group</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <User size={16} />
            <span>New Message</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
