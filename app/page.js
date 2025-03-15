import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export default async function Home() {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:9000/graphql',
    cache: new InMemoryCache(),
  });
  const posts = await client
    .query({
      query: gql`
      query {
        posts {
          id
        }
      }
    `,
    }).then(({data: {posts}}) => posts);
  
  return (
    <div>
      <h1>Post details: </h1>
      <div>
        {posts?.map((obj) => (<p key={obj.id}>{obj.id}</p>))}
      </div>
    </div>
  );
}
