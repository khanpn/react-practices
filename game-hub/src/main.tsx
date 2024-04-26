import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/authProvider.tsx";
import ColorModeProvider from "./providers/colorModeProvider.tsx";
import router from "./routers.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ColorModeProvider>
          <RouterProvider router={router} />
        </ColorModeProvider>
      </AuthProvider>
    </QueryClientProvider>
    <ReactQueryDevtools client={queryClient} />
  </React.StrictMode>
);
