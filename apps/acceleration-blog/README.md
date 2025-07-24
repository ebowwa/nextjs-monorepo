A statically generated blog using Next.js, Markdown, and TypeScript

This is the existing [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) plus TypeScript.

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using Markdown files as the data source.

The blog posts are stored in `/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

To create the blog posts we use [`remark`](https://github.com/remarkjs/remark) and [`remark-html`](https://github.com/remarkjs/remark-html) to convert the Markdown files into an HTML string, and then send it down as a prop to the page. The metadata of every post is handled by [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and also sent in props to the page.

```
<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">umm.. i can be trusted with a 3D printer. i need a 3D printer <a href="https://t.co/2uxlvdfQaX">pic.twitter.com/2uxlvdfQaX</a></p>&mdash; simulationapi -- e/acc (@innitEBOWWA) <a href="https://twitter.com/innitEBOWWA/status/1748220582792159320?ref_src=twsrc%5Etfw">January 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```

## Curl Commands

Here are some curl commands for interacting with the API:

1. **Search Posts with Keywords**

   This command searches for posts with specific keywords. In this case, the keywords are 'JavaScript' and 'API'.

   ```bash
   curl -X GET 'https://a-cell.vercel.app/api/posts/search/searchPosts?keywords[]=JavaScript&keywords[]=API'
   ```

2. **Get All Posts**

   This command retrieves all posts.

   ```bash
   curl https://a-cell.vercel.app/api/posts/all
   ```

3. **Sort Posts**

   This command sorts posts by title in ascending order.

   ```bash
   curl -X GET 'https://a-cell.vercel.app/api/posts/sorting/sortPosts?sortBy=title&order=asc'
   ```

in progress: 
```
- full `.mdx` support fix components rendering
- openapi spec integration
- threads for blog posts
- comenting to blog posts
- blog search - indexed blogs
- gpt to blogs
- personal gpt's for pay/usage
```

```
https://github.com/LouisShark/chatgpt_system_prompt
```
