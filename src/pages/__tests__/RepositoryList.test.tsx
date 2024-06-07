import { render, screen } from '@testing-library/react';
import RepositoryList from '../../pages/RepositoryList';

test('repository list renders', async () => {
  render(<RepositoryList />);
  const linkElement = await screen.findByText(/Top Starred Repositories/i);
  expect(linkElement).toBeInTheDocument();
});
