// src/components/FileInput.tsx
import { Label } from "@/components/ui/common/label";
import { Input } from "@/components/ui/common/input";
import { FileInputProps } from "@/types/index";

export const FileInput: React.FC<FileInputProps> = ({ accept, onChange }) => (
  <div className="w-full grid gap-1.5">
    <Label htmlFor="images">Select images</Label>
    <Input accept={accept} id="images" multiple type="file" onChange={onChange} />
    <span className="text-sm text-gray-500">Drag and drop images or click to select them from your computer.</span>
  </div>
);
