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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import ChatBotBody from "@/assets/ofia-chatbot.png";
import HeadChatbotOFIA from "@/assets/ofia-chatbot-head.png";
import { TolltipInfoHover } from "@/modules/core/router";
import { getAgentResponse } from "../services/apiService";
import InvoiceDrawerDetails from "./InvoiceDrawerDetails";

interface Message {
  id: number;
  text: {
    message: string;
    action: string;
    params: string;
  };
  sender: "user" | "agent";
  isTyping?: boolean;
}

interface AssistentSheetProps {
  type: string;
  initialMessage: string;
  params: {};
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

const AssistentSheet: React.FC<AssistentSheetProps> = ({
  type = "toltip",
  initialMessage,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  var [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState(initialMessage || "");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Efecto para manejar el mensaje inicial cuando el componente se monta
  useEffect(() => {
    if (initialMessage && initialMessage.trim() !== "") {
      handleSendMessage(initialMessage);
    }
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleSendMessage = (messageToSend = inputMessage) => {
    if (messageToSend.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: {
        message: messageToSend,
        action: "",
        params: "",
      },
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    handleAgentResponse(messageToSend);
  };

  const handleAgentResponse = async (userMessage: string) => {
    setMessages((prev) => prev.filter((msg) => !msg.isTyping));

    // Agregar indicador de typing
    const typingMessage: Message = {
      id: Date.now() + 2,
      text: {
        message: "I'm thinking, please wait",
        action: "",
        params: "",
      },
      sender: "agent",
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      console.log("User message:", userMessage);
      console.log("Initial message:", initialMessage);

      // Verificar si es el mensaje inicial y manejarlo diferente
      const isInitialMessageSending =
        userMessage === initialMessage && messages.length <= 2;

      if (isInitialMessageSending) {
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isTyping),
          {
            id: Date.now() + 3,
            text: {
              message:
                "The Canada Customs & Revenue Agency has 9 new invoices with a high confidence level of being duplicated",
              action: "Review this Invoice Group",
              params: "",
            },
            sender: "agent",
          },
        ]);
      } else {
        const agentResponse = await getAgentResponse(userMessage);
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isTyping),
          {
            id: Date.now() + 3,
            text: {
              message: agentResponse.response || "I'm thinking, please wait",
              action: "",
              params: "",
            },
            sender: "agent",
          },
        ]);
      }
    } catch (error) {
      console.error("Error getting agent response:", error);
      setMessages((prev) => [
        ...prev.filter((msg) => !msg.isTyping),
        {
          id: Date.now() + 3,
          text: {
            message:
              "Sorry, I couldn't process your request. Please try again later.",
            action: "Please try again later.",
            params: "",
          },
          sender: "agent",
        },
      ]);
    }
  };

  useEffect(() => {
    if (isSheetOpen) {
      if (initialMessage && initialMessage.trim() !== "") {
        setInputMessage(initialMessage);
      }
      setMessages([]);
    }
  }, [isSheetOpen]); // Se ejecuta cada vez que cambia isSheetOpen

  const button: HTMLElement | null = document.querySelector(
    ".floating-sofia-button"
  );
  function handleAnimationEnd(): void {
    if (!button) return;
    button.classList.remove("animate");
    setTimeout((): void => {
      button?.classList.add("animate");
    }, 5000);
  }

  if (button) {
    button.addEventListener("animationend", handleAnimationEnd);
    if (isSheetOpen) {
      button.classList.remove("animate");
    }
    setTimeout((): void => {
      button.classList.add("animate");
    }, 1000);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {type == "tooltip" ? (
        <TolltipInfoHover
          title="✨ Ask to SOFIA ✨"
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
      ) : type == "floating-button" ? (
        <TolltipInfoHover title="✨ Ask to OFIA ✨" content="" action={null}>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="floating-sofia-button rounded-full h-12 w-12 shadow-lg p-1 bg-primary cursor-pointer"
            >
              <div className="ring-spacer h-full w-full rounded-full bg-zinc-50 flex justify-center items-center">
                <picture className="floating-button-img-concept">
                  <source src={HeadChatbotOFIA} />
                  <img
                    src={HeadChatbotOFIA}
                    alt="ofia-chatbot-concept"
                    width={50}
                    height={50}
                  />
                </picture>
              </div>
            </Button>
          </SheetTrigger>
        </TolltipInfoHover>
      ) : (
        <SheetTrigger asChild>
          <Button variant="default" className="cursor-pointer">
            ✨Review with SOFIA✨
          </Button>
        </SheetTrigger>
      )}

      <SheetContent className="max-h-[95dvh] m-auto rounded-l-md border-l-2 border-t-2 border-b-2 border-amber-400">
        <SheetHeader>
          <SheetTitle className="text-center">✨ SOFIA AGENT ✨</SheetTitle>
        </SheetHeader>

        <div className="py-4 px-6 sheet-body-content flex flex-col gap-3 w-full h-full">
          <ScrollArea className="h-[460px] w-[340px]">
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
              <div className="flex-grow overflow-y-auto p-4 space-y-4 max-w-[350px]">
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
                      <div className={`flex items-end space-x-2 max-w-[100%]`}>
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
                          <div
                            className={`py-2 px-3 text-sm ${
                              message.sender === "user"
                                ? "bg-amber-50 text-amber-950 border-amber-300 border rounded-l-xl rounded-tr-xl"
                                : "bg-amber-50 text-amber-800 border-amber-300 border rounded-r-xl rounded-tl-xl"
                            }`}
                          >
                            <p>{message.text.message}</p>
                            {message.text.action && (
                              <InvoiceDrawerDetails
                                buttonTitle="Review Goup Invoice"
                                group_uuid={message.text.params}
                                type="button"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
          <div className="sheet-input-container">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Button variant="outline" type="submit">
                <CloudUpload />
              </Button>
              <Input
                type="email"
                placeholder="Ask anything"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={() => handleSendMessage()}
                className="cursor-pointer"
              >
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
