import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { serialize } from 'next-mdx-remote/serialize';

export default async function markdownToHtml(markdown: string) {
  // Using remark with remark-mdx for MDX support
  const mdxResult = await remark().use(remarkMdx).process(markdown);

  // Serialize the MDX content
  const mdxContent = await serialize(mdxResult.toString());

  return mdxContent;
}
