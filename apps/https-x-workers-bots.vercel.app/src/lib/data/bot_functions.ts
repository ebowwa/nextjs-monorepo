import { Bot, BotData } from './bot_types';

/**
 * Finds a bot by its name.
 * @param botData - The array of bot data.
 * @param botName - The name of the bot to search for.
 * @returns The bot object if found, otherwise undefined.
 */
export function findBotByName(botData: BotData, botName: string): Bot | undefined {
  return botData.find((bot) => bot.bot.toLowerCase() === botName.toLowerCase());
}

/**
 * Filters the bot data based on a given tag.
 * @param botData - The array of bot data.
 * @param tag - The tag to filter by.
 * @returns A new array of bot data that match the given tag.
 */
export function filterBotsByTag(botData: BotData, tag: string): BotData {
  return botData.filter((bot) => bot.tags.toLowerCase().includes(tag.toLowerCase()));
}

/**
 * Sorts the bot data by rating in descending order.
 * @param botData - The array of bot data.
 * @returns A new array of bot data sorted by rating in descending order.
 */
export function sortBotsByRating(botData: BotData): BotData {
  return [...botData].sort((a, b) => b.rating - a.rating);
}

/**
 * Calculates the average rating of the bot data.
 * @param botData - The array of bot data.
 * @returns The average rating of the bot data.
 */
export function calculateAverageRating(botData: BotData): number {
  const totalRating = botData.reduce((sum, bot) => sum + bot.rating, 0);
  return totalRating / botData.length;
}