import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Assuming an environment variable for GitHub API token
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

// Function to check the time interval between requests
// Now configurable to allow different rate limits
const canMakeRequest = (lastRequestTime: number | null, interval: number) => {
  if (!lastRequestTime) return true;
  const currentTime = Date.now();
  return (currentTime - lastRequestTime) >= interval;
};

let lastRequestTime: number | null = null;
// Configurable request interval, could be adjusted for the plugin's needs
const requestInterval = 60000; // 60 seconds

// Validate the GitHub endpoint to ensure it's a proper path segment
const isValidGitHubEndpoint = (endpoint: string) => {
  // Add any specific validations needed for your use case
  return endpoint.startsWith('/') && !endpoint.includes('..');
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check if enough time has passed since the last request
    if (!canMakeRequest(lastRequestTime, requestInterval)) {
      res.status(429).json({ error: 'Request too frequent. Please wait.' });
      return;
    }

    const { endpoint } = req.query;
    // Validate the endpoint to ensure it's a valid GitHub API endpoint
    if (!endpoint || typeof endpoint !== 'string' || !isValidGitHubEndpoint(endpoint)) {
      res.status(400).json({ error: 'Invalid or no GitHub endpoint specified.' });
      return;
    }

    // Construct GitHub API URL
    const githubApiUrl = `https://api.github.com${endpoint}`;

    // Make a request to the GitHub API
    const response = await axios.get(githubApiUrl, {
      headers: {
        Authorization: `token ${GITHUB_API_TOKEN}`
      }
    });

    // Update the last request time
    lastRequestTime = Date.now();

    // Respond with the data from GitHub API
    res.status(200).json(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Handle network or Axios specific errors
      const status = error.response?.status || 500;
      const message = error.response?.data.message || error.message || 'An error occurred with the GitHub API request';
      res.status(status).json({ error: message });
    } else {
      // Handle unexpected errors
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}
