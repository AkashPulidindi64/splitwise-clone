"use client";

import { useEffect, useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const expenseId = "cmpzc0ggf0003tv5kru7pm5b1";
  const userId = "cmpyaqdj70003tvtnnlj0g1gs";

  const loadMessages = async () => {
    const res = await fetch(
      `/api/messages?expenseId=${expenseId}`
    );

    const data = await res.json();

    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async () => {
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        message,
        userId,
        expenseId,
      }),
    });

    setMessage("");

    loadMessages();
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-black mb-6">
          Expense Chat
        </h1>

        <div className="space-y-3 mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border p-3 rounded"
            >
              <p className="font-semibold text-black">
                {msg.user.name}
              </p>

              <p className="text-black">
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full border p-3 rounded text-black mb-4"
        />

        <button
          onClick={sendMessage}
          className="w-full bg-black text-white p-3 rounded"
        >
          Send Message
        </button>

      </div>
    </div>
  );
}