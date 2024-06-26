import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './apis/queryClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
