import React, { useState, useEffect } from "react";
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
import AdminOrders from "./Admin";


axios.defaults.withCredentials = true;

export default function Website() {
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin-orders/", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((response) => {
                setIsAdmin(response.data.is_admin);
            })
            .catch((error) => {
                console.error("Error fetching order data:", error);
                setIsAdmin(false);
            });
    }, []);

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
                        <div className="other-page menu-page">
                            <Navbar />
                            <Menu />
                            <Footer />
                        </div>
                    } />
                    <Route path="/discount" element={
                        <div className="other-page discount-page">
                            <Navbar />
                            <Discount />
                            <Footer />
                        </div>
                    } />
                    <Route path="/cart" element={
                        <div className="other-page cart-page">
                            <Navbar />
                            <Cart />
                            <Footer />
                        </div>
                    } />
                    <Route path="/account" element={
                        <div className="other-page account-page">
                            <Navbar />
                            <Account />
                            <Footer />
                        </div>
                    } />
                    <Route path="/contactus" element={
                        <div className="contact-page other-page">
                            <Navbar />
                            <Contactus />
                            <Footer />
                        </div>
                    } />
                    <Route path="/aboutus" element={
                        <div className="about-page other-page">
                            <Navbar />
                            <Aboutus />.
                            <Footer />
                        </div>
                    } />
                    <Route path="/faq" element={
                        <div className="other-page faq-page">
                            <Navbar />
                            <FAQ />
                            <Footer />
                        </div>
                    } />
                    <Route path="/terms" element={
                        <div className="other-page terms-page">
                            <Navbar />
                            <Terms />
                            <Footer />
                        </div>
                    } />
                    <Route path="/privacy" element={
                        <div className="other-page privacy-page">
                            <Navbar />
                            <Privacy />
                            <Footer />
                        </div>
                    } />
                    <Route path="/review" element={
                        <div className="other-page review-page">
                            <Navbar />
                            <Review />
                            <Footer />
                        </div>
                    } />


                    {isAdmin &&
                        <Route path="/admin_page" element={
                            <div className="other-page admin-page">
                                {/* <Navbar /> */}
                                <AdminOrders />
                                <Footer />
                            </div>
                        } />
                    }


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


