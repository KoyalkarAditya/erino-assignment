import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <Layout>
          <App />
        </Layout>
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
