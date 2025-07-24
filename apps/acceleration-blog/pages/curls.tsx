import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const CurlCommands = styled.pre`
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  font-size: 16px;
  white-space: pre-wrap;
  text-align: left;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
`;

const GptLink = styled.a`
  color: #0070f3;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const GptImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CurlPage: React.FC = () => {
  return (
    <PageContainer>
      <Title>Curl Commands</Title>
      <CurlCommands>
        {`# Search Posts
curl -X GET 'https://acceleration-e14gqajju-ebowwa.vercel.app/api/posts/search/searchPosts?keywords[]=JavaScript&keywords[]=API'

# Get All Posts
curl https://acceleration-iofvxqzaf-ebowwa.vercel.app/api/posts/all

# Sort Posts by Title (Ascending)
curl -X GET 'https://acceleration-e14gqajju-ebowwa.vercel.app/api/posts/sorting/sortPosts?sortBy=title&order=asc'`}
      </CurlCommands>
      <Description>
        Add these endpoints to your GPT, software, or model trainings.
        <br />
        Explore the <GptLink href="https://chat.openai.com/g/g-kddwKMo02-acceleration-blog">acceleration blog</GptLink> GPT for blog-related actions.
        <br />
        <GptImage src="https://chat.openai.com/g/g-kddwKMo02-acceleration-blog" alt="Acceleration Blog GPT" />
      </Description>
    </PageContainer>
  );
};

export default CurlPage;
