import React, { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CloudUpload, SendHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChatBotBody from "@/assets/ofia-chatbot.png";
import HeadChatbotOFIA from "@/assets/ofia-chatbot-head.png";
import { TolltipInfoHover } from "@/modules/core/router";
import { getAgentResponse } from "../services/apiService";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  isTyping?: boolean;
}

const TypingDots: React.FC = () => {
  return (
    <div className="flex space-x-1 py-2 px-3 bg-gray-200 rounded-full">
      {[1, 2, 3].map((dot) => (
        <motion.span
          key={dot}
          className="h-2 w-2 bg-gray-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const AssistentSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  var [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");

    // Simular respuesta del servidor
    handleAgentResponse(inputMessage);
  };

  // Función actualizada para obtener respuesta desde la API
  const handleAgentResponse = async (userMessage: string) => {
    // Eliminar cualquier mensaje de typing previo
    setMessages((prev) => prev.filter((msg) => !msg.isTyping));

    // Agregar indicador de typing
    const typingMessage: Message = {
      id: Date.now() + 2,
      text: "",
      sender: "agent",
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // Llamar a la API para obtener la respuesta
      const agentResponse = await getAgentResponse(userMessage);
      console.log(agentResponse);

      // Actualizar mensajes con la respuesta real de la API
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          id: Date.now() + 3,
          text: agentResponse.response || `I'm thinking, please wait"`,
          sender: "agent",
        },
      ]);
    } catch (error) {
      // Manejar error en caso de fallo en la API
      console.error("Error getting agent response:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          id: Date.now() + 3,
          text: `Sorry, I couldn't process your request. Please try again later.`,
          sender: "agent",
        },
      ]);
    }
  };

  const isFirstOpen = useRef(true);
  useEffect(() => {
    if (isSheetOpen && isFirstOpen.current) {
      const defaultMessage =
        "How to define if an invoice is a `similar invoice`?";
      const newUserMessage: Message = {
        id: Date.now(),
        text: defaultMessage,
        sender: "user",
      };

      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      handleAgentResponse(defaultMessage);
      isFirstOpen.current = false;
    } else {
      messages = [];
    }
  }, [isSheetOpen]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <TolltipInfoHover
        title="✨ Ask to OFIA ✨"
        content="Learn more about this KPI"
        action={null}
      >
        <SheetTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <picture className="floating-button-img-concept">
              <source src={HeadChatbotOFIA} />
              <img
                src={HeadChatbotOFIA}
                alt="ofia-chatbot-concept"
                width={30}
                height={30}
              />
            </picture>
          </Button>
        </SheetTrigger>
      </TolltipInfoHover>

      <SheetContent className="max-h-[95dvh] m-auto rounded-l-md border-l-2 border-t-2 border-b-2 border-amber-400">
        <SheetHeader>
          <SheetTitle className="text-center">✨ OFIA AGENT ✨</SheetTitle>
        </SheetHeader>
        <div className="py-4 px-6 sheet-body-content flex flex-col gap-3 h-full">
          <div className="sheet-chat-container min-h-[90%]">
            {messages.length == 0 ? (
              <div className="starter-chat-pack-container flex flex-col gap-4 items-center">
                <picture className="chat-bot-agent-concept">
                  <source src={ChatBotBody} />
                  <img
                    src={ChatBotBody}
                    alt="OFIA chatbot concept"
                    width={150}
                    height={150}
                  />
                </picture>
                <p className="text-2xl font-bold text-center px-4">
                  Hello again, How can I help you today?
                </p>

                <div className="started-topics-grid grid grid-cols-2 gap-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recomendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p style={{ fontSize: "12px" }}>
                        Explain to me the improvements recomendations on extra
                        match group invoices
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p style={{ fontSize: "12px" }}>
                        Show me the most duplicated vendor on January 2025
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, translateY: 20 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      exit={{ opacity: 0, translateY: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start space-x-2 ${
                        message.sender === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end space-x-2 max-w-[100%]`}
                      >
                        {message.sender === "agent" ? (
                          message.isTyping ? (
                            <TypingDots />
                          ) : (
                            <picture className="floating-button-img-concept w-[400px]">
                              <source src={HeadChatbotOFIA} />
                              <img
                                src={HeadChatbotOFIA}
                                alt="ofia-chatbot-concept"
                                width={200}
                                height={200}
                              />
                            </picture>
                          )
                        ) : (
                          <div></div>
                        )}
                        {!message.isTyping && (
                          <p
                            className={`py-2 px-3 text-sm ${
                              message.sender === "user"
                                ? "bg-amber-50 text-amber-950 border-amber-300 border rounded-l-xl rounded-tr-xl"
                                : "bg-amber-50 text-amber-800 border-amber-300 border rounded-r-xl rounded-tl-xl"
                            }`}
                          >
                            {message.text}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
          <div className="sheet-input-container">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Button variant="outline" type="submit">
                <CloudUpload />
              </Button>
              <Input
                type="email"
                placeholder="Ask Anything"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <SendHorizontal />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AssistentSheet;
