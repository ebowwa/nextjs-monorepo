"use client";
// app/page.tsx
import { VisionContainer } from "@/components/gemini/VisionContainer";
import { ChatContainer } from "@/components/gemini/ChatContainer";
import { ControlContainer } from "@/components/gemini/control/ControlContainer";
import { useControlContext } from "@/providers/ControlContext";

export default function Home() {
  const { selectedModel } = useControlContext();

  return (
    <main className="grid md:grid-rows-[1fr_auto] max-h-screen h-screen max-w-6xl m-auto gap-4 p-2 md:p-4 my-12 md:my-0">
      <div className="md:row-span-1">
        {selectedModel === "gemini-pro" ? (
          <div className="grid md:grid-cols-12 gap-4 h-full">
            <div className="md:col-span-9">
              <ChatContainer />
            </div>
            <div className="md:col-span-3">
              {/* This space intentionally left blank to maintain grid layout */}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-12 gap-4 h-full">
            <div className="md:col-span-9">
              <VisionContainer />
            </div>
            <div className="md:col-span-3">
              {/* This space intentionally left blank to maintain grid layout */}
            </div>
          </div>
        )}
      </div>
      <div className="md:row-span-auto">
        <ControlContainer />
      </div>
    </main>
  );
}
