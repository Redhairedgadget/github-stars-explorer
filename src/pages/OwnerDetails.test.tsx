import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OwnerDetails from './OwnerDetails';
import { useFetchOwnerDetails } from '../apis/useFetchOwnerDetails';

jest.mock('../apis/useFetchOwnerDetails');

const mockOwnerDetails = {
  login: 'mockuser',
  avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
  bio: 'This is a mock bio',
  location: 'Mock City',
  html_url: 'https://github.com/mockuser'
};

describe('OwnerDetails Component', () => {
  test('should render owner details correctly', () => {
    (useFetchOwnerDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockOwnerDetails,
    });

    render(<OwnerDetails />);

    expect(screen.getByText('mockuser')).toBeInTheDocument();
    expect(screen.getByText('This is a mock bio')).toBeInTheDocument();
    expect(screen.getByText('Mock City')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View on GitHub/i })).toHaveAttribute('href', 'https://github.com/mockuser');
  });

  test('should show loading spinner when data is loading', () => {
    (useFetchOwnerDetails as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: null,
    });

    render(<OwnerDetails />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('should show error message when request fails', () => {
    (useFetchOwnerDetails as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: null,
      error: new Error('An error occurred'),
    });

    render(<OwnerDetails />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
  });
});
