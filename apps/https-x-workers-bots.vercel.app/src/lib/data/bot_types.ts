// src/lib/data/bot_types.ts
export interface Bot {
    bot: string;
    idea: string;
    sequence: string;
    "intro message": string;
    "info message": string;
    description: string;
    "feature_1": string;
    "feature_2": string;
    "feature_3": string;
    twitter_handle: string;
    rating: number;
    tags: string;
    href: string;
    image: string;
    author: string;
  }
  
  export type BotData = Bot[];