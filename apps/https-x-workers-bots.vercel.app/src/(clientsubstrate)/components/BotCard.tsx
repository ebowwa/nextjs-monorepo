/**
 * @see https://v0.dev/t/QV4sLRV1O4F
 */

// src/components/BotCard.tsx

import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { CardTitle, CardHeader, CardContent, Card } from "./ui/card";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { FC } from "react";
import {
  CheckIcon,
  InfoIcon,
  LightbulbIcon,
  MessageCircleIcon,
  PhoneIcon,
  StarIcon,
  TwitterIcon,
} from "./icons";
import { Bot } from "@/lib/data/bot_types";

const Component: FC<{ bot: Bot }> = ({ bot }) => {
  const avatarFallback = `${bot.bot[0]}`;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={bot.image} />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{bot.bot}</CardTitle>
            <p className="text-gray-500 dark:text-gray-400">{bot["idea"]}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{bot.description}</p>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <LightbulbIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["idea"]}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot.sequence}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["intro message"]}</span>
            </div>
            <div className="flex items-center gap-2">
              <InfoIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["info message"]}</span>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["feature_1"]}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["feature_2"]}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span>{bot["feature_3"]}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TwitterIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <Link
              className="text-blue-600 hover:underline"
              href={`https://twitter.com/${bot.twitter_handle}`}
            >
              {bot.twitter_handle}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="h-5 w-5 fill-yellow-500" />
            <span className="font-medium">{bot.rating.toFixed(1)}</span>
            <span className="text-gray-500 dark:text-gray-400">(123 reviews)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {bot.tags.split(",").map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Component;