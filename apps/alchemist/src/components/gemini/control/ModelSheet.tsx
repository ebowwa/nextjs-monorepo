import React, { useState } from "react";
import { Button } from "@/components/ui/common/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/common/sheet";
import { ModelDropdown } from "./ModelDropdown"; // Assuming this is the correct path
import { SafetySelector } from "./SafetySelector"; // Assuming this is the correct path
import { SettingsSelector } from "./SettingsSelector"; // Assuming this is the correct path

export const SettingsSheet = () => {
  const [selectedModel, setSelectedModel] = useState("gemini-pro");
  const [safetyValue, setSafetyValue] = useState(1);
  const [settingsValue, setSettingsValue] = useState(5);

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Adjust your profile and preferences.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <ModelDropdown selectedModel={selectedModel} handleModelChange={handleModelChange} />
          <SafetySelector label="Safety Level" value={safetyValue} onValueChange={(value) => setSafetyValue(value[0])} />
          <SettingsSelector label="Settings Level" hoverText="Adjust your settings level." step={1} max={10} value={settingsValue} onValueChange={(value) => setSettingsValue(value[0])} />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
