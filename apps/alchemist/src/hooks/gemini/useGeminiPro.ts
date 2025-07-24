// src/hooks/useGeminiPro.ts
// one-shot only potentilly not multi-turn
import { useState } from "react";
import { Message } from "ai/react";
import { GeneralSettings, SafetySettings } from "@/types";

interface GeminiProSettings {
  generalSettings: GeneralSettings;
  safetySettings: SafetySettings;
}

export const useGeminiPro = (settings: GeminiProSettings) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (userInput: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini-pro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { id: crypto.randomUUID(), content: userInput, role: "user" },
          ],
          general_settings: settings.generalSettings,
          safety_settings: settings.safetySettings,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      let reader = response.body?.getReader();
      let decoder = new TextDecoder();
      let modelOutputText = '';

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          modelOutputText += chunk;
        }
      }

      // Update messages with the unformatted model output
      if (modelOutputText) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: crypto.randomUUID(), content: modelOutputText, role: "assistant" },
        ]);
      }
    } catch (error) {
      console.error("Fetch operation failed:", error);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputValue = input.trim();
    if (inputValue !== "") {
      fetchData(inputValue);
    }
  };

  return {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  };
};
