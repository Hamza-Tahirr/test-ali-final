import React, { useState } from 'react';

interface ChatProps {
  selectedText: string;
}

const Chat: React.FC<ChatProps> = ({ selectedText }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="w-1/5 bg-gray-200 p-4 h-screen overflow-y-scroll">
      <h2 className="font-bold text-lg mb-4">Chat</h2>
      {selectedText && (
        <div className="mb-4 rounded bg-white p-3 text-sm">
          <p className="font-bold mb-1">Selected text</p>
          <p className="whitespace-pre-wrap">{selectedText}</p>
        </div>
      )}
      <div className="mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="flex-grow min-w-0 border rounded-l py-2 px-3"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
