"use client";
// src/app/test/page.tsx
// chat = good; multiturn = not available yet
import React, { useEffect, useRef, useState } from "react";
import { useControlContext } from "@/providers/ControlContext";
import { useGeminiPro } from "@/hooks/gemini/useGeminiPro";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";

export default function GemiPage() {
    const { generalSettings, safetySettings } = useControlContext();
    const { messages, input, isLoading, handleInputChange, handleSubmit } = useGeminiPro({
        generalSettings,
        safetySettings,
    });

    const [modelOutput, setModelOutput] = useState(""); // State to hold model output

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // Function to handle form submission
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Set model output to the input value
        setModelOutput(input);

        // Call handleSubmit function from useGeminiPro hook
        handleSubmit(e);
    };

    return (
        <div>
            <h1>Gemini Pro Chat</h1>
            <form onSubmit={handleFormSubmit}>
                <textarea value={input} onChange={handleInputChange} disabled={isLoading} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Submit"}
                </button>
            </form>
            <div ref={chatContainerRef} style={{ maxHeight: "500px", overflow: "auto" }}>
                {/* Render model output */}
                {modelOutput && (
                  <Card>
                      <CardHeader>
                          <CardTitle>You:</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <pre>{JSON.stringify(modelOutput, null, 2)}</pre>
                      </CardContent>
                  </Card>
              )}



                {/* Render messages */}
                {messages.map((message, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{message.role === "user" ? "You" : "Assistant"}:</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{message.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
