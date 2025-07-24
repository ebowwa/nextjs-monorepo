// src/components/SuccessfulCampaigns.tsx
import React from 'react';
import { Bot, BotData } from '../../../lib/data/bot_types';
import agentsData from '../../../../public/data/agents.json';
import portfolioData from '../../../../public/html/portfolio.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';

const SuccessfulCampaigns: React.FC = () => {
  const content: BotData = agentsData;
  const { portfolio } = portfolioData;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="portfolio">
      <div className="container px-4 md:px-6">
        <div className="space-y-2 text-center">
          <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
            NEW BOTS 
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            {portfolio.title}
          </h2>
          <p className="max-w-[700px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            {portfolio.description}
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl justify-items-center gap-16 py-12 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          {content.map((item, index) => (
            <div key={index} className="w-full sm:w-[400px] md:w-[450px] lg:w-[500px]">
              <Link href={`${item.href}`}>
                <Card className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 hover:shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">{item.bot}</CardTitle>
                    <CardDescription className="text-lg">{item.idea}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      alt={`Portfolio ${index + 1}`}
                      className="mb-4 aspect-[4/3] w-full rounded-lg object-cover h-[300px]"
                      height="300"
                      src={item.image}
                      width="400"
                    />
                  </CardContent>
                  <CardFooter>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessfulCampaigns;