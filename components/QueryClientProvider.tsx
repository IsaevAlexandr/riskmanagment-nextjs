import { QueryClient, QueryClientProvider as LibQueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const QueryClientProvider: React.FC = ({ children }) => {
  return <LibQueryClientProvider client={queryClient}>{children}</LibQueryClientProvider>;
};
