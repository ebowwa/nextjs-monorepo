// app/agents/[slug]/page.tsx
import { Bot, BotData } from '@/lib/data/bot_types';
import botData from '../../../../../public/data/agents.json';

export default function Page({ params }: { params: { slug: string } }) {
  const bots: BotData = botData;
  const bot = bots.find((b) => b.href === `/agents/${params.slug}`);

  if (!bot) {
    return <div>Bot not found</div>;
  }

  return (
    <div>
      <h1>{bot.bot}</h1>
      <p>{bot.description}</p>
      <p>Idea: {bot.idea}</p>
      <p>Sequence: {bot.sequence}</p>
      <p>Intro Message: {bot["intro message"]}</p>
      <p>Info Message: {bot["info message"]}</p>
      <p>Feature 1: {bot["feature_1"]}</p>
      <p>Feature 2: {bot["feature_2"]}</p>
      <p>Feature 3: {bot["feature_3"]}</p>
      <p>Twitter Handle: {bot.twitter_handle}</p>
      <p>Rating: {bot.rating}</p>
      <p>Tags: {bot.tags}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const bots: BotData = botData;
  return bots.map((bot) => ({
    slug: bot.href.split('/').pop()!,
  }));
}