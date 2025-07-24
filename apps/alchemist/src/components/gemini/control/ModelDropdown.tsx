// components/control/ModelDropdown.tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/common/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ModelDropdownProps {
  selectedModel: string;
  handleModelChange: (model: string) => void;
}

export const ModelDropdown = ({ selectedModel, handleModelChange }: ModelDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border w-full rounded flex justify-between p-2">
        <div>Model:</div>
        <div className="flex">
          {selectedModel} <ChevronDown className="h-4 w-4 my-auto ml-2" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem className="w-full" onClick={() => handleModelChange("gemini-pro")}>
          gemini-pro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleModelChange("gemini-pro-vision")}>
          gemini-pro-vision
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
