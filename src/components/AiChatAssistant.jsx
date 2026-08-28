// src/components/AiChatAssistant.jsx
import { useState, useEffect, useRef } from "react";
import "./AiChatAssistant.css";

// ✅ Usar variable de entorno con fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);

  const [sessionId] = useState(
    () =>
      `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
  );

  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      content:
        "🌸 ¡Hola! Soy Alba, tu asesora de belleza. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre cortes, tintes, tratamientos o cualquier consejo de cuidado capilar. ¡Estoy aquí para ti! 💇‍♀️",
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/ai/preguntas-sugeridas`)
      .then((res) => res.json())
      .then((data) => setSuggestedQuestions(data))
      .catch((err) => console.error("Error cargando sugerencias:", err));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (message = input) => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const historial = messages.slice(-5);

      const response = await fetch(`${API_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          sessionId,
          historial,
        }),
      });

      const data = await response.json();

      const assistantMessage = {
        role: "assistant",
        content:
          data.respuesta ||
          data.error ||
          "Lo siento, no pude procesar tu pregunta.",
        contexto: data.contexto,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, estoy teniendo problemas técnicos. ¿Quieres que te ayude a contactar con la peluquería directamente? 📞",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
      .replace(/✅/g, "✅ ")
      .replace(/❌/g, "❌ ")
      .replace(/🎨/g, "🎨 ")
      .replace(/💇‍♀️/g, "💇‍♀️ ")
      .replace(/💰/g, "💰 ")
      .replace(/⏱️/g, "⏱️ ")
      .replace(/📍/g, "📍 ")
      .replace(/📞/g, "📞 ")
      .replace(/📧/g, "📧 ")
      .replace(/🌐/g, "🌐 ")
      .replace(/📱/g, "📱 ")
      .replace(/📅/g, "📅 ")
      .replace(/✂️/g, "✂️ ")
      .replace(/💆‍♀️/g, "💆‍♀️ ")
      .replace(/🧴/g, "🧴 ")
      .replace(/💧/g, "💧 ")
      .replace(/🌿/g, "🌿 ")
      .replace(/🌸/g, "🌸 ")
      .replace(/🌀/g, "🌀 ")
      .replace(/🌟/g, "🌟 ")
      .replace(/💎/g, "💎 ")
      .replace(/🏆/g, "🏆 ")
      .replace(/🛍️/g, "🛍️ ")
      .replace(/💡/g, "💡 ")
      .replace(/🎯/g, "🎯 ")
      .replace(/🚫/g, "🚫 ")
      .replace(/⚠️/g, "⚠️ ")
      .replace(/⏳/g, "⏳ ")
      .replace(/✨/g, "✨ ");
  };

  return (
    <>
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="chat-avatar">🌸</span>
              <div>
                <h3>Alba - Asesora de Belleza</h3>
                <small>Online • Responde en segundos</small>
              </div>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                <div className="message-content">
                  {msg.role === "assistant" && (
                    <span className="message-avatar">🌸</span>
                  )}
                  <div
                    className="message-text"
                    dangerouslySetInnerHTML={{
                      __html: formatMessage(msg.content),
                    }}
                  />
                </div>
                {msg.contexto && msg.contexto.length > 0 && (
                  <div className="message-contexto">
                    <small>
                      📍 Relacionado con:{" "}
                      {msg.contexto.map((c) => c.subtitulo).join(", ")}
                    </small>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content">
                  <span className="message-avatar">🌸</span>
                  <div className="message-text typing-indicator">
                    <span>●</span>
                    <span>●</span>
                    <span>●</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 3 && suggestedQuestions.length > 0 && (
            <div className="chat-suggestions">
              <p className="suggestions-title">💡 Preguntas frecuentes:</p>
              <div className="suggestions-grid">
                {suggestedQuestions.slice(0, 4).map((q, index) => (
                  <button
                    key={index}
                    className="suggestion-btn"
                    onClick={() => sendMessage(q.pregunta)}
                  >
                    {q.pregunta}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? "⏳" : "➤"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AiChatAssistant;
