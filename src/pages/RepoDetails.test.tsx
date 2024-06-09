import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router } from 'react-router-dom';
import RepoDetails from './RepoDetails';
import { useLocation } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

const mockRepository = {
  id: 1,
  name: 'Mock Repository 1',
  description: 'This is a mock repository',
  stargazers_count: 100,
  html_url: 'https://github.com/mockuser/mock-repo1',
  owner: {
    login: 'mockuser'
  }
};

describe('RepoDetails Component', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      state: { repository: mockRepository },
    });
  });

  test('should render repository details correctly', () => {
    render(
      <Router>
        <RepoDetails />
      </Router>
    );

    expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'a' && content.includes('mockuser');
    })).toBeInTheDocument();
    
    expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'h3' && content.includes('Mock Repository 1');
    })).toBeInTheDocument();
    
    expect(screen.getByText('This is a mock repository')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View on GitHub/i })).toHaveAttribute('href', 'https://github.com/mockuser/mock-repo1');
  });
});
