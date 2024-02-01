import GalleryPage from "./components/GalleryPage/GalleryPage.js";
import SelectedImage from "./components/SelectedImage/SelectedImage.js";
import MainPage from "./components/MainPage/MainPage.js";
import Header from "./components/Header/Header.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<GalleryPage/>} />
        <Route path="/image/:id" element={<SelectedImage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
