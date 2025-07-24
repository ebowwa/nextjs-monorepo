import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');

// Revised getPostSlugs function to strip file extensions
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).map(file => {
    // Strip the .md or .mdx extension from the filename to get the slug
    return file.replace(/\.mdx?$/, '');
  });
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  // Updated to handle both .md and .mdx files
  let fullPathMd = join(postsDirectory, `${slug}.md`);
  let fullPathMdx = join(postsDirectory, `${slug}.mdx`);
  let fullPath;

  // Check if the file exists with .md or .mdx extension
  if (fs.existsSync(fullPathMd)) {
    fullPath = fullPathMd;
  } else if (fs.existsSync(fullPathMdx)) {
    fullPath = fullPathMdx;
  } else {
    throw new Error(`Post file not found for slug: ${slug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
