'use client'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import React from 'react';

export const dynamic = 'force-dynamic'

export default function Home() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const client = new ApolloClient({
      uri: '/graphql',
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`
          query {
            posts {
              id
              userName
              type
              content
            }
          }
        `}).then(({ data: { posts } }) => setPosts(posts));
  }, []);
  
  return (
    <div>
      <h1>Post details: </h1>
      <br />
      <div>
        {posts?.map((obj) => (
          <div key={obj.id}>
            <div>
              <p>{obj.id}</p>
              <p>{obj.userName}</p>
              <p>{obj.type}</p>
              <p>{obj.content}</p>
            </div>
            <br />
          </ div>
        ))}
      </div>
    </div>
  );
}