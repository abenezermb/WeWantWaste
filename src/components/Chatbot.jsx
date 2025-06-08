import React, { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const quickReplies = [
    "What skip sizes are available?",
    "How much does delivery cost?",
    "I need permit information"
  ];
  const endRef = useRef(null);

  const toggleOpen = () => setOpen(!open);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate operator response
    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: `Thanks for asking: "${text}". We'll get back to you shortly!`
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleQuickReply = (text) => sendMessage(text);

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-72 h-80 bg-white shadow-lg rounded-t-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-full" />
              <span className="font-semibold">WeWantWaste</span>
            </div>
            <button onClick={toggleOpen} aria-label="Close chat">
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-2 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`px-3 py-1 rounded-lg max-w-xs ${
                    msg.sender === "bot"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Quick replies & input */}
          <div className="p-2 space-y-2">
            <div className="flex flex-wrap gap-1">
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(qr)}
                  className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full hover:bg-gray-300"
                >
                  {qr}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => sendMessage(input)}
                className="text-blue-600"
                aria-label="Send message"
              >
                <FiMessageCircle size={24} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleOpen}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          aria-label="Open chat"
        >
          <FiMessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
