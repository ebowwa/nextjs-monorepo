import { ResponsiveLine } from "@nivo/line";
import type { LineProps } from "@nivo/line";
import data from "../../../../public/data/stefan.json";

// Define the props for the CurvedLineChart component
interface CurvedLineChartProps {
  platformTweets: string[];
  distances: number[];
  userTweet: string;
  userTweetDistance: number;
  queryTweet: string;
  queryTweetDistance: number;
}

// Define the props for the ResponsiveLine component
interface ResponsiveLineProps extends LineProps {
  useMesh?: boolean;
  gridYValues?: number;
}

// Render the CurvedLineChart component
const CurvedLineChart: React.FC<CurvedLineChartProps> = ({
  platformTweets,
  distances,
  userTweet,
  userTweetDistance,
  queryTweet,
  queryTweetDistance,
}) => {
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
      {
        // The third line represents the "Query Tweet"
        id: "Query Tweet",
        data: [
          {
            // There is only one data point for the query tweet, with the x-value being the tweet and the y-value being the distance
            x: queryTweet,
            y: queryTweetDistance,
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
    colors: ["#2563eb", "#e11d48", "#0000ff"], // Add blue color for the query tweet
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
    <div className="aspect-[2/1] w-full">
      <ResponsiveLine {...lineChartProps} />
    </div>
  );
};

export default CurvedLineChart;