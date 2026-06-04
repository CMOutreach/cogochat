"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";

interface Message {
  role: "user" | "ai";
  text: string;
}

const WHATSAPP_NUMBER = "447476173595"; // TODO: replace with real number

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for CogoChat, a web design and digital marketing agency that helps small businesses get more customers online.

CogoChat offers:
- Web design from £499 (custom, mobile-first, conversion focused)
- Landing pages from £249
- Lead generation from £149 per month
- Ads management from £249 per month

The name CogoChat comes from the Latin "cogito" meaning to think and to plan. CogoChat is about strategic conversations — helping businesses have a better conversation with their customers online.

Everything is fully remote. Free consultation with no obligation. No long-term contracts.

Keep your replies short, warm and human. Two or three sentences maximum. If someone asks for pricing, give the starting price and suggest a free consultation for an accurate quote. If someone asks to speak to a person or says they want an agent, tell them you will flag it to the team right away and that someone will be in touch shortly, then end your reply with exactly the text: ESCALATE_TO_AGENT`;

export function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi there! I am here to help with any questions about CogoChat. What would you like to know?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMsg: Message = { role: "user", text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: updated
            .filter((m) => m.role === "user" || m.role === "ai")
            .map((m) => ({
              role: m.role === "ai" ? "assistant" : "user",
              content: m.text,
            })),
        }),
      });

      const data = await res.json();
      const reply: string = data?.content?.[0]?.text ?? "Sorry, something went wrong. Please try again.";

      if (reply.includes("ESCALATE_TO_AGENT")) {
        const cleanReply = reply.replace("ESCALATE_TO_AGENT", "").trim();
        setMessages((prev) => [...prev, { role: "ai", text: cleanReply }]);
        setEscalated(true);

        // Build WhatsApp message with conversation context
        const transcript = updated
          .map((m) => `${m.role === "user" ? "Visitor" : "AI"}: ${m.text}`)
          .join("\n");
        const waText = encodeURIComponent(
          `New CogoChat lead requesting an agent.\n\nConversation:\n${transcript}\n\nVisitor last said: ${text}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank");
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong on my end. You can also reach us through the contact form above." },
      ]);
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300",
          open ? "bg-white/20 border border-white/30" : "bg-brand-500 hover:bg-brand-600"
        )}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[340px] rounded-2xl border border-white/15 bg-[#0d1410] shadow-2xl transition-all duration-300 flex flex-col overflow-hidden",
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ maxHeight: "480px" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold">
            CC
          </div>
          <div>
            <p className="text-sm font-medium text-white">CogoChat</p>
            <p className="text-xs text-brand-400">Ask us anything</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" style={{ minHeight: "260px", maxHeight: "320px" }}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "ai"
                  ? "bg-white/10 text-white/80 self-start rounded-tl-sm"
                  : "bg-brand-500 text-white self-end rounded-tr-sm"
              )}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="self-start bg-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
          )}
          {escalated && (
            <div className="self-start bg-brand-500/15 border border-brand-500/30 rounded-2xl px-4 py-2.5 text-xs text-brand-300">
              A member of the team has been notified and will be in touch shortly.
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            disabled={loading || escalated}
            className="flex-1 rounded-xl bg-white/8 border border-white/15 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-brand-500 transition disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim() || escalated}
            className="w-9 h-9 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
