import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import routes from "./config/app-route"
import MainLayout from "./pages/layout/MainLayout"
import { Toaster } from "react-hot-toast";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
          {routes.map((route, index) => {
            if (route.layout) {
              return (
                <>
                  <Route element={<MainLayout />}>
                    <Route
                      key={route.path}
                      path={route.path}
                      element={route.element}
                    />
                  </Route>
                </>
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              );
            }
          })}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
