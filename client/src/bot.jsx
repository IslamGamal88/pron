import { useState, useEffect } from "react";
import io from "socket.io-client";

const url =
  process.env.NODE_ENV === "production"
    ? "http://164.92.181.199:8080"
    : "http://localhost:8080";

const socket = io(url);

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setLoading] = useState(false);

  socket.on("connect", () => {
    console.log("connected");
  });

  useEffect(() => {
    socket.on("question", (question) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: question, from: "bot" },
      ]);
    });

    socket.on("response", (response) => {
      setLoading(false); // Hide loading indicator when response received
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, from: "bot" },
      ]);
    });

    return () => {
      socket.off("question");
      socket.off("response");
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, from: "user" },
    ]);
    setLoading(true); // Show loading indicator when submitting answer
    socket.emit("answer", input);
    setInput("");
  };

  return (
    <div className=" pt-20">
      <div className="container w-3/4 mx-auto">
        <div>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.from === "bot" ? "text-left" : "text-right"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        {isLoading && (
          <div className="text-center py-2">Loading...</div>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button
            className="mt-2 p-2 w-full bg-slate-300 rounded-md text-white"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
