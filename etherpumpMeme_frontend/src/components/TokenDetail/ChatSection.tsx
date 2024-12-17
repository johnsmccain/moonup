import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatSectionProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
}

export function ChatSection({ messages, onSendMessage }: ChatSectionProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 h-[400px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4">Community Chat</h3>
      
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-800 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <span className="text-purple-400 font-medium">{message.sender}</span>
              <span className="text-xs text-gray-400">{message.timestamp}</span>
            </div>
            <p className="text-white">{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}