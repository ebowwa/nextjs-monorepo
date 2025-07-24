/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WGNquMzlgWV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { ResponsiveLine } from "@nivo/line";
import type { LineProps } from "@nivo/line";
import Link from "next/link";
import { platform_tweets, distances, user_tweet, user_tweet_distance } from "../../../../public/data/stefan.json";
import visualizeText from "../../../../public/data/visualizeText.json";
import { useState, useEffect } from 'react';
import { euclideanDistance } from './euclidean-distance';

// Define the props for the CurvedLineChart component
interface CurvedLineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  platformTweets: string[];
  distances: number[];
  userTweet: string;
  userTweetDistance: number;
}

// Define the props for the ResponsiveLine component
interface ResponsiveLineProps extends LineProps {
  useMesh?: boolean;
  gridYValues?: number;
}

// Render the CurvedLineChart component
function CurvedLineChart(props: CurvedLineChartProps) {
  const { platformTweets, distances, userTweet, userTweetDistance } = props;

  // Configure the line chart props
  const lineChartProps: ResponsiveLineProps = {
    // This data object represents the data that will be displayed in the line chart
    data: [
      {
        // The first line represents the "Platform Tweets"
        id: "Platform Tweets",
        data: platformTweets.map((tweet, index) => ({
          // Each data point has an x-value (the tweet) and a y-value (the distance)
          x: tweet,
          y: distances[index],
        })),
      },
      {
        // The second line represents the "Your Tweet"
        id: "Your Tweet",
        data: [
          {
            // There is only one data point for the user's tweet, with the x-value being the tweet and the y-value being the distance
            x: userTweet,
            y: userTweetDistance,
          },
        ],
      },
    ],
    // Additional configuration options for the line chart
    margin: { top: 10, right: 10, bottom: 40, left: 40 },
    xScale: {
      type: "point",
    },
    yScale: {
      type: "linear",
      min: 0,
      max: "auto",
    },
    curve: "monotoneX",
    axisTop: null,
    axisRight: null,
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
    },
    axisLeft: {
      tickSize: 0,
      tickValues: 5,
      tickPadding: 16,
    },
    colors: ["#2563eb", "#e11d48"],
    pointSize: 6,
    useMesh: true,
    gridYValues: 6,
    theme: {
      tooltip: {
        chip: {
          borderRadius: "9999px",
        },
        container: {
          fontSize: "12px",
          textTransform: "capitalize",
          borderRadius: "6px",
        },
      },
      grid: {
        line: {
          stroke: "#f3f4f6",
        },
      },
    },
  };

  // Render the ResponsiveLine component with the configured props
  return (
    <div {...props}>
      <ResponsiveLine {...lineChartProps} />
    </div>
  );
}

// Render the main component
export default function Component() {
  // Create a state variable to hold the user's input
  const [userInput, setUserInput] = useState('');

  // Call the findSimilarTweets function whenever the userInput state changes
  useEffect(() => {
    findSimilarTweets(userInput);
  }, [userInput]);

  // Implement the findSimilarTweets function
  function findSimilarTweets(query: string) {
    // Calculate the Euclidean distance between the query and each tweet
    const similarities = platform_tweets.map(tweet => {
      const queryVector = query.split(' ').map(word => 1);
      const tweetVector = tweet.split(' ').map(word => 1);
      return euclideanDistance(queryVector, tweetVector);
    });

    // Find the top 3 most similar tweets
    const topTweets = platform_tweets.map((tweet, index) => ({
      tweet,
      similarity: similarities[index],
    }))
    .sort((a, b) => a.similarity - b.similarity)
    .slice(0, 3);

    // Display the top 3 similar tweets
    console.log('Top 3 similar tweets:');
    topTweets.forEach(({ tweet, similarity }) => {
      console.log(`- ${tweet} (similarity: ${similarity.toFixed(2)})`);
    });
  }

  // Render the main component
  return (
    <div
      key="1"
      className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            IQ Bell Curve
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {visualizeText.visualizeText} {visualizeText.learnMore}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          {/* Render the input field */}
          <input
            type="text"
            placeholder="Enter a query"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* Render the CurvedLineChart component */}
          <CurvedLineChart
            className="aspect-[2/1] w-full"
            platformTweets={platform_tweets}
            distances={distances}
            userTweet={user_tweet}
            userTweetDistance={user_tweet_distance}
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {visualizeText.bellCurveText} population.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            href="#"
          >
            {visualizeText.learnMore}
          </Link>
        </div>
      </div>
    </div>
  );
}
