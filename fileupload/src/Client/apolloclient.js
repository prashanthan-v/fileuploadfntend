import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const uploadLink = createUploadLink({
  uri: 'http://localhost:8000/graphql/', // Update with your backend URL
});

const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache(),
});

export default client;
