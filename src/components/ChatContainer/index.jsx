import React, { useState, useRef, useEffect } from "react";
import "./index.scss";

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true
    };

    const botResponse = {
      text: "This is a bot response.",
      timestamp: new Date().toLocaleTimeString(),
      isUser: false
    };

    setMessages([...messages, userMessage, botResponse]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div className={`message ${message.isUser ? "user" : "bot"}`} key={index}>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
        <button type="button" className="submit-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;
