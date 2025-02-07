import { BrowserRouter, Routes, Route } from "react-router"
import "./App.css"
import Navbar from "./components/Navbar"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Footer from "./components/Footer"
import routes from "./config/app-route"

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
