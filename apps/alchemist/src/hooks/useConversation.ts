// src/hooks/useConversation.ts

import { useState, useEffect, useCallback } from "react";
import { Message } from "ai/react";

import { GeneralSettings, SafetySettings } from "@/types";

interface ConversationSettings {
 generalSettings: GeneralSettings;
 safetySettings: SafetySettings;
}

interface UseConversationOptions {
 initialMessages?: Message[];
 settings: ConversationSettings;
}

interface UseConversationResult {
 messages: Message[];
 input: string;
 isLoading: boolean;
 error: Error | null;
 handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
 handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const useConversation = ({
 initialMessages = [],
 settings,
}: UseConversationOptions): UseConversationResult => {
 const [messages, setMessages] = useState<Message[]>(initialMessages);
 const [input, setInput] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<Error | null>(null);

 const fetchData = useCallback(async () => {
   setIsLoading(true);
   setError(null);

   try {
     const response = await fetch("/api/gemini-pro", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         messages,
         general_settings: settings.generalSettings,
         safety_settings: settings.safetySettings,
       }),
     });

     if (response.ok) {
       const data = response.body;
       if (data) {
         const reader = data.getReader();
         const decoder = new TextDecoder();
         let done = false;
         let message = "";

         while (!done) {
           const { value, done: doneReading } = await reader.read();
           done = doneReading;
           const chunkValue = decoder.decode(value);
           message += chunkValue;
         }

         setMessages((prevMessages) => [
           ...prevMessages,
           { id: crypto.randomUUID(), content: message, role: "assistant" },
         ]);
       }
     } else {
       setError(new Error(`Error: ${response.statusText}`));
     }
   } catch (error) {
     setError(error as Error);
   } finally {
     setIsLoading(false);
     setInput("");
   }
 }, [messages, settings.generalSettings, settings.safetySettings]);

 useEffect(() => {
   const sendMessage = () => {
     if (input.trim() !== "") {
       setMessages((prevMessages) => [
         ...prevMessages,
         { id: crypto.randomUUID(), content: input, role: "user" },
       ]);
       fetchData();
     }
   };

   const messageSubscription = sendMessage();

   return () => {
     // Cleanup function to handle any pending API calls or subscriptions
     // when the component is unmounted
     // Since there's an error indicating that 'unsubscribe' does not exist on type 'never',
     // it implies that 'sendMessage' function does not return a subscription object.
     // Therefore, we should not attempt to call unsubscribe on 'messageSubscription'.
     // Instead, we should ensure that any cleanup logic needed is correctly implemented within 'sendMessage' itself
     // or reconsider the design to ensure that if a subscription is expected, it is correctly returned by 'sendMessage'.
   };
 }, [input, fetchData]);

 const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
   setInput(event.target.value);
 };

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   const inputElement = event.currentTarget.elements.namedItem(
     "input"
   ) as HTMLInputElement;
   setInput(inputElement?.value || "");
 };

 return {
   messages,
   input,
   isLoading,
   error,
   handleInputChange,
   handleSubmit,
 };
};