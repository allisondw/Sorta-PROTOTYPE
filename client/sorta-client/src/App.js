import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GalleryPage from "./components/GalleryPage/GalleryPage.js";
import SelectedImage from "./components/SelectedImage/SelectedImage.js";
import MainPage from "./components/MainPage/MainPage.js";
import CreatePage from "./components/CreatePage/CreatePage.js";
import Header from "./components/Header/Header.js";
import AuthPage from './components/AuthPage/AuthPage.js';
import "./App.scss";

function App() {
    const [userName, setUserName] = useState('');

    const handleSuccessfulLogin = (user) => {
        setUserName(user.name); 
    };

    return (
        <BrowserRouter>
            <Header userName={userName} />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/image/:id" element={<SelectedImage />} />
                <Route path="/edit/:id" element={<CreatePage />} />
                <Route path="/login" element={<AuthPage isLogin={true} onSuccessfulLogin={handleSuccessfulLogin} />} />
                <Route path="/register" element={<AuthPage isLogin={false} onSuccessfulLogin={handleSuccessfulLogin} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
