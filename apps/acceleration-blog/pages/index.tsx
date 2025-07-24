// Importing necessary components and styles
import Container from '../components/container';
import MoreStories from '../components/more-stories';
import HeroPost from '../components/hero-post';
import Intro from '../components/intro';
import Layout from '../components/layout';
import { getAllPosts } from '../lib/api';
import Head from 'next/head';
import { CMS_NAME } from '../lib/constants';
import Post from '../interfaces/post';
import styles from '../styles/Tags.module.css'; // Import the CSS module for tags

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]; // First post as the hero post
  const morePosts = allPosts.slice(1); // Remaining posts

  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              tags={heroPost.tags} // Pass tags to HeroPost
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              tagStyles={styles} // Pass the CSS module for tag styling
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'tags', // Ensure tags are included in the fetched data
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
