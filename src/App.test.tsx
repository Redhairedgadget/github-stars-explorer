import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import App from './App';
import { useFetchRepos } from './apis/useFetchRepos';

jest.mock('./apis/useFetchRepos');

const queryClient = new QueryClient();

const renderWithProviders = () => {
  render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render Header', () => {
    (useFetchRepos as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: { repositories: [], totalPages: 1 },
    });
    renderWithProviders();

    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'a' && content.includes('Github STARS');
    })).toBeInTheDocument();
  });

  test('should show Loading message when request is pending', () => {
    (useFetchRepos as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: null,
    });
    renderWithProviders();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should render list of repos when request is successful', async () => {
    (useFetchRepos as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: {
        repositories: [
          {
            id: 1,
            name: 'Mock Repository 1',
            description: 'This is a mock repository',
            stargazers_count: 100,
            html_url: 'https://github.com/mockuser/mock-repo1',
            owner: {
              login: 'mockuser'
            }
          },
          {
            id: 2,
            name: 'Mock Repository 2',
            description: 'Another mock repository',
            stargazers_count: 200,
            html_url: 'https://github.com/mockuser/mock-repo2',
            owner: {
              login: 'mockuser'
            }
          }
        ],
        totalPages: 1,
      },
    });
    renderWithProviders();

    const listNode = await waitFor(() => screen.getByTestId('repo-list'));
    expect(listNode).toBeInTheDocument();
    expect(screen.getByText('Mock Repository 1')).toBeInTheDocument();
    expect(screen.getByText('Mock Repository 2')).toBeInTheDocument();
  });

  test('should show error message when request fails', async () => {
    (useFetchRepos as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: null,
      error: new Error('An error occurred'),
    });
    renderWithProviders();

    const errorNode = await waitFor(() => screen.getByText('An error occurred'));
    expect(errorNode).toBeInTheDocument();
  });
});
