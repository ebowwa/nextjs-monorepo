// app/workers/page.tsx

import Component from "../../../(clientsubstrate)/components/BotCard";
import { Bot, BotData } from "@/lib/data/bot_types";
import agentsData from "../../../../public/data/agents.json";

const Page: React.FC = () => {
  const botData: BotData = agentsData as BotData;

  return (
    <div className="container mx-auto py-8">
      {botData.map((bot: Bot, index: number) => (
        <div key={index} className="mb-8">
          <Component bot={bot} />
        </div>
      ))}
    </div>
  );
};

export default Page;