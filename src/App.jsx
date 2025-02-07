import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./pages/homepage/HomePage";
import DiaryPage from "./pages/diaries/DiaryPage";
import NotFound from "./pages/not-found/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/diary" element={<DiaryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
