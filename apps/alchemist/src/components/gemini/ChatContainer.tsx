"use client";
// components/ChatContainer.tsx
import React from "react";
import { useChat } from "ai/react";
import { Card } from "../ui/common/card";
import { useControlContext } from "@/providers/ControlContext";
import { CommonForm } from "./CommonForm";
import { TypingBubble } from "./TypingBubble";
import { MessageCircleX } from "lucide-react";
import { Button } from "../ui/common/button";
import { MessageItem } from "./MessageItem";
import { useMessageHandling } from "@/hooks/gemini/useMessageHandling";

export const ChatContainer = () => {
  const { generalSettings, safetySettings } = useControlContext();

  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    isLoading,
  } = useChat({
    id: "gemini-pro",
    api: `/api/gemini-pro`,
    body: {
      general_settings: generalSettings,
      safety_settings: safetySettings,
    },
  });

  const { messagesEndRef, handleRemoveMessage } = useMessageHandling(messages, setMessages);

  return (
    <div className="flex flex-col h-[95vh]">
      <Card className="flex flex-col flex-1 overflow-hidden">
        {messages.length > 0 && (
          <div className="flex p-4">
            <Button
              variant="secondary"
              type="button"
              size="sm"
              onClick={() => setMessages([])}
            >
              <MessageCircleX className="mr-2" /> Clear chat history
            </Button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {messages.map((message, index) => (
            <MessageItem
              key={message.id}
              message={message}
              isLastMessage={messages.length === index + 1}
              isLoading={isLoading}
              onRefresh={reload}
              onRemove={() => handleRemoveMessage(message.id)}
            />
          ))}
          <div ref={messagesEndRef} />
          {isLoading && <TypingBubble />}
        </div>
        <CommonForm
          value={input}
          placeholder="Chat with Gemini Pro"
          loading={isLoading}
          onInputChange={handleInputChange}
          onFormSubmit={handleSubmit}
          isSubmittable={input.trim() !== ""}
        />
      </Card>
    </div>
  );
};
