import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./pages/homepage/HomePage";
import DiaryPage from "./pages/diaries/DiaryPage";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
