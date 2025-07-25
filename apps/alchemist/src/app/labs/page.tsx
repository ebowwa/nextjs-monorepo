/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Kf4IWV9JWXt
 */
import { PlaygroundLabs } from "@/components/sections/PlaygroundLabs";
import { Playground } from "@/types/index";

const playgroundData: Playground[] = [
  {
    id: "content-creators",
    title: "Print on Demand Assistant",
    description: "using AI to help you sell your ideas too large audiences",
    previewImageSrc: "/placeholder.svg",
    href: "/printondemand",
  },
  {
    id: "job-hunting",
    title: "Resume Assistant",
    description: "Professional Resume Creation with the help of AI",
    previewImageSrc: "/placeholder.svg",
    href: "#",
  },
  // Add more playground data here
];

export default function App() {
  return (
    <div>
      <PlaygroundLabs playgrounds={playgroundData} />
      {/* Add other components or content */}
    </div>
  );
}