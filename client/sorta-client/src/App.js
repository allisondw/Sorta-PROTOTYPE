import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GalleryPage from "./components/GalleryPage/GalleryPage.js";
import SelectedImage from "./components/SelectedImage/SelectedImage.js";
import MainPage from "./components/MainPage/MainPage.js";
import CreatePage from "./components/CreatePage/CreatePage.js";
import Header from "./components/Header/Header.js";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal.js";
import "./App.scss";

function App() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);
    const openRegistrationModal = () => {
        closeLoginModal(); 
        setIsRegistrationModalOpen(true);
    };
    const closeRegistrationModal = () => setIsRegistrationModalOpen(false); 

    return (
        <BrowserRouter>
            <Header 
                openLoginModal={openLoginModal}
                openRegistrationModal={openRegistrationModal}
            />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/image/:id" element={<SelectedImage />} />
                <Route path="/edit/:id" element={<CreatePage />} />
            </Routes>
            {isLoginModalOpen && <LoginModal 
                onSwitchToRegister={openRegistrationModal} 
                closeModal={closeLoginModal} 
            />}
            {isRegistrationModalOpen && <RegisterModal closeModal={closeRegistrationModal} />}
        </BrowserRouter>
    );
}

export default App;
