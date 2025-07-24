// api/posts.ts

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default async (req, res) => {
  try {
    // Define the path to your _posts directory
    const postsDirectory = path.join(process.cwd(), '_posts');

    // Read all the file names in the _posts directory
    const fileNames = await fs.readdir(postsDirectory);

    // Read the content of each markdown file and convert it to JSON
    const postsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = await fs.readFile(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return { ...data, content };
      })
    );

    // Respond with the JSON data
    res.status(200).json(postsData);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
