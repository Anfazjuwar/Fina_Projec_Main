import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bot, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ChatbotDialog() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const { user, isAuthenticated, isLoading } = useSelector(
      (state) => state.auth
    );
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Error: AI failed to respond." },
      ]);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="fixed z-50 p-3 text-white bg-blue-600 rounded-full shadow-md bottom-4 right-4 hover:bg-blue-700"
          onClick={() => setOpen(true)}
        >
          <Bot className="w-5 h-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-full h-[600px] flex flex-col p-4 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Car Assistant Chat</h2>
          <button onClick={() => setOpen(false)}>
            {/* <X className="w-5 h-5" /> */}
          </button>
        </div>

        <div className="flex-1 p-3 mb-3 space-y-2 overflow-y-auto text-sm rounded bg-muted">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                msg.role === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start"
              }`}
            >
              <strong>{msg.role === "user" ? "you" : "Nj Comapany"}: </strong>
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-gray-400">Typing...</div>}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask about German or Japanese cars..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage} disabled={loading}>
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChatbotDialog;
