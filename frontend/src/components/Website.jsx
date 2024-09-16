import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Menu from "./Menu";
import Discount from "./Discount";
import Cart from "./Cart";
import Account from "./Account";
import Aboutus from './Aboutus';
import Contactus from './Conatctus';
import FAQ from "./FAQ";
import Terms from "./Terms";
import Privacy from './Privacy'
import NoPage from "./NoPage";
import Review from "./Review";
import axios from 'axios';

import Footer from "./Footer"
import Navbar from "./Navbar"
import API_BASE_URL from '../config';


axios.defaults.withCredentials = true;

export default function Website() {

    return (
        <div>
            <Router>
                {/* routes */}
                <Routes>
                    <Route path="/" element={
                        <div className="home-page">
                            <Navbar />
                            <Home />
                            <Footer />
                        </div>
                    } />
                    <Route path="/menu" element={
                        <div className="">
                            <Navbar />
                            <Menu />
                            <Footer />
                        </div>
                    } />
                    <Route path="/discount" element={
                        <div className="">
                            <Navbar />
                            <Discount />
                            <Footer />
                        </div>
                    } />
                    <Route path="/cart" element={
                        <div className="">
                            <Navbar />
                            <Cart />
                            <Footer />
                        </div>
                    } />
                    <Route path="/account" element={
                        <div className="">
                            <Navbar />
                            <Account />
                            <Footer />
                        </div>
                    } />
                    <Route path="/contactus" element={
                        <div className="contact-page">
                            <Navbar />
                            <Contactus />
                            <Footer />
                        </div>
                    } />
                    <Route path="/aboutus" element={
                        <div className="about-page">
                            <Navbar />
                            <Aboutus />.
                            <Footer />
                        </div>
                    } />
                    <Route path="/faq" element={
                        <div className="">
                            <Navbar />
                            <FAQ />
                            <Footer />
                        </div>
                    } />
                    <Route path="/terms" element={
                        <div className="">
                            <Navbar />
                            <Terms />
                            <Footer />
                        </div>
                    } />
                    <Route path="/privacy" element={
                        <div className="">
                            <Navbar />
                            <Privacy />
                            <Footer />
                        </div>
                    } />
                    <Route path="/review" element={
                        <div className="">
                            <Navbar />
                            <Review />
                            <Footer />
                        </div>
                    } />
                    <Route path="*" element={
                        <div className="">
                            <NoPage />
                        </div>
                    } />
                </Routes>

            </Router>

        </div>
    )
}


