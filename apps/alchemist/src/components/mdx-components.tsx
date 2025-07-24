// mdx-components.tsx (required for App Router)
import { MDXComponents } from 'mdx/types'

const mdxComponents: MDXComponents = {
  // Custom components for different Markdown elements
  h1: (props) => <h1 className="text-4xl font-bold" {...props} />,
  // Add more components as needed
}

export default mdxComponents