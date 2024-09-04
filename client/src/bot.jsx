import { useState, useEffect } from "react";
import io from "socket.io-client";
import Bot from "./assets/bot.jpeg";
const url =
  process.env.NODE_ENV === "production"
    ? "http://208.68.36.226:8080"
    : "http://localhost:8080";

const socket = io(url);

const Chat = () => {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("chatMessages")) || []
  );
  const [input, setInput] = useState("");
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleInitialQuestion = (question) => {
      const newMessage = { text: question, from: "bot" };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedMessages)
        );
        return updatedMessages;
      });
    };

    const handleQuestion = (question) => {
      const newMessage = { text: question, from: "bot" };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedMessages)
        );
        return updatedMessages;
      });
    };

    const handleResponse = (response) => {
      // setLoading(false);
      const newMessage = { text: response, from: "bot" };
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedMessages)
        );
        return updatedMessages;
      });
    };

    socket.on("connect", () => {
      if (messages.length === 0) {
        socket.emit("getInitialQuestion"); // Emit an event to get the initial question
      }
    });

    socket.on("initialQuestion", handleInitialQuestion);
    socket.on("question", handleQuestion);
    socket.on("response", handleResponse);

    return () => {
      socket.off("initialQuestion", handleInitialQuestion);
      socket.off("question", handleQuestion);
      socket.off("response", handleResponse);
    };
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    const userMessage = { text: input, from: "user" };
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      localStorage.setItem(
        "chatMessages",
        JSON.stringify(updatedMessages)
      );
      return updatedMessages;
    });
    socket.emit("answer", input);
    // setLoading(true);
    setInput("");
  };

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
    socket.emit("getInitialQuestion"); // Emit an event to get the initial question again
  };
  return (
    <div className="h-screen pt-10">
      <div className="w-full flex flex-col items-center">
        <h1 className="text-4xl  font-raleway">
          How can we help you?
        </h1>
        <img src={Bot} alt="Bot" className="h-full object-contain" />
      </div>

      <div className="container w-3/4 m-auto flex flex-col h-3/4">
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-whatsapp object-cover">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.from === "bot"
                  ? "bg-green-100 self-start"
                  : "bg-blue-100 self-end"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {/* {loading && (
            <div className="p-2 rounded-lg bg-green-100 self-start">
              Loading...
            </div>
          )} */}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
          <input
            className="p-2 border border-gray-400 rounded w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <div className="mt-2 flex space-x-2 pb-4">
            <button
              className="p-2 bg-slate-300 rounded-md"
              type="submit"
            >
              Send
            </button>
            <button
              type="button"
              className="p-2 bg-red-300 rounded-md"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
