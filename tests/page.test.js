import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Home from '../app/page';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import '@testing-library/jest-dom'; // Import jest-dom matchers

jest.mock('@apollo/client', () => {
  const originalModule = jest.requireActual('@apollo/client');
  return {
    ...originalModule,
    ApolloClient: jest.fn(),
    InMemoryCache: jest.fn(),
    gql: jest.fn(),
  };
});

describe('Home component', () => {
  let mockPosts;
  beforeEach(() => {
    InMemoryCache.mockImplementation(() => ({
      cache: jest.fn(),
    }));

    gql.mockImplementation((query) => query);

    mockPosts = [
      { id: '1', userName: 'User1', type: 'Type1', content: 'Content1' },
      { id: '2', userName: 'User2', type: 'Type2', content: 'Content2' },
    ];
    ApolloClient.mockImplementation(() => ({
      query: jest.fn().mockResolvedValue({
        data: { posts: mockPosts },
      }),
    }));
  });

  it('renders posts correctly', async () => {
    render(<Home />);

    expect(await screen.findByText('Post details:')).toBeInTheDocument();
    mockPosts.forEach(async (post) => {
      expect(await screen.findByText(post.id)).toBeInTheDocument();
      expect(await screen.findByText(post.userName)).toBeInTheDocument();
      expect(await screen.findByText(post.type)).toBeInTheDocument();
      expect(await screen.findByText(post.content)).toBeInTheDocument();
    });
  });

  it("should match with snapshot", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });
});