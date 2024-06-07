import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
