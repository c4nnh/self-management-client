import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './i18n'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  </React.StrictMode>
)
