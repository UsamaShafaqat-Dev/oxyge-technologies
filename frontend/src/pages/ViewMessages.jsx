import React, { useState, useEffect } from "react";
import { getMessages, markMessageAsRead, deleteMessage } from "../services/api";

const ViewMessages = () => {
  // ------------------- STATES -------------------
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const token = localStorage.getItem("adminToken");

  // ------------------- FETCH MESSAGES -------------------
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getMessages(token);
      setMessages(response.messages || []);
      setError(null);
    } catch (err) {
      console.log("Fetch error:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ------------------- MARK AS READ -------------------
  const handleMarkAsRead = async (id) => {
    try {
      await markMessageAsRead(id, token);
      // Update local state
      setMessages(
        messages.map((msg) =>
          msg._id === id ? { ...msg, isRead: true } : msg,
        ),
      );
    } catch (err) {
      console.log("Mark as read error:", err);
    }
  };

  // ------------------- DELETE MESSAGE -------------------
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id, token);
        setMessages(messages.filter((msg) => msg._id !== id));
        if (selectedMessage?._id === id) setSelectedMessage(null);
      } catch (err) {
        console.log("Delete error:", err);
        alert("Failed to delete message");
      }
    }
  };

  // ------------------- FORMAT DATE -------------------
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // ------------------- LOADING STATE -------------------
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-2xl" style={{ color: "var(--foreground)" }}>
          Loading messages...
        </div>
      </div>
    );
  }

  // Calculate unread count
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Contact Messages
          </h1>
          {unreadCount > 0 && (
            <p className="mt-1" style={{ color: "var(--accent)" }}>
              {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <button
          onClick={fetchMessages}
          className="px-4 py-2 rounded-lg transition-all hover:scale-105"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-center bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {messages.length === 0 ? (
        <div
          className="text-center py-12"
          style={{ color: "var(--foreground-light)" }}
        >
          No messages yet. When someone contacts you, it will appear here.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div
            className="lg:col-span-1 rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <div className="max-h-[600px] overflow-y-auto">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`p-4 cursor-pointer transition-all hover:bg-opacity-50 ${
                    selectedMessage?._id === msg._id ? "bg-opacity-20" : ""
                  } ${!msg.isRead ? "border-l-4 border-l-[#10B981]" : ""}`}
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3
                        className="font-bold"
                        style={{ color: "var(--foreground)" }}
                      >
                        {msg.name}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--foreground-light)" }}
                      >
                        {msg.email}
                      </p>
                    </div>
                    {!msg.isRead && (
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: "#10B981", color: "white" }}
                      >
                        New
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm mt-2"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {msg.subject}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Detail */}
          <div
            className="lg:col-span-2 rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            {selectedMessage ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {selectedMessage.subject}
                    </h2>
                    <p
                      className="mt-1"
                      style={{ color: "var(--foreground-light)" }}
                    >
                      From: {selectedMessage.name} ({selectedMessage.email})
                    </p>
                    {selectedMessage.phone && (
                      <p
                        className="text-sm"
                        style={{ color: "var(--foreground-light)" }}
                      >
                        Phone: {selectedMessage.phone}
                      </p>
                    )}
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--foreground-light)" }}
                    >
                      Received: {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!selectedMessage.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage._id)}
                        className="px-3 py-1 rounded text-sm transition-all hover:scale-105"
                        style={{ backgroundColor: "#10B981", color: "white" }}
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      className="px-3 py-1 rounded text-sm transition-all hover:scale-105"
                      style={{ backgroundColor: "#EF4444", color: "white" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div
                  className="pt-4 mt-2"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <p
                    className="whitespace-pre-wrap"
                    style={{ color: "var(--foreground-light)" }}
                  >
                    {selectedMessage.message}
                  </p>
                </div>
              </>
            ) : (
              <div
                className="text-center py-12"
                style={{ color: "var(--foreground-light)" }}
              >
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMessages;
