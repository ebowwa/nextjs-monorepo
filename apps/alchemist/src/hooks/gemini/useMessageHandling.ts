// hooks/useMessageHandling.ts
import { useRef, useEffect, useCallback } from "react";
import { Message } from "ai/react";

export const useMessageHandling = (messages: Message[], setMessages: (messages: Message[]) => void) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const messagesRef = useRef<Message[]>(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const handleRemoveMessage = useCallback(
    (id: string) => {
      const newMessages = messagesRef.current.filter((message) => message.id !== id);
      setMessages(newMessages);
    },
    [setMessages]
  );

  return { messagesEndRef, handleRemoveMessage };
};
