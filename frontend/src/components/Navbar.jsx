import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from './../logo.jpg'
import Signin from "./Signin";
import Signup from './Signup'
import axios from 'axios';
import API_BASE_URL from '../config';

axios.defaults.withCredentials = true;

export default function Navbar() {
    const [login, setLogin] = useState(false)

    // Function to fetch authentication status
    useEffect(() => {
        const fetchAuthentication = () => {
            axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
                .then(response => {
                    if (response.data.status === "success") {
                        // console.log("(Website) user data is", response.data);
                        setLogin(true);
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        };

        // Run the function immediately and then every second
        fetchAuthentication();
        const interval = setInterval(fetchAuthentication, 2000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);


    function userLogout() {
        const res = window.confirm("Are you sure to Log out?")
        if (res) {
            setLogin(false)
            axios.post(`${API_BASE_URL}/logout/`)
                .then(response => {
                    if (response.data.status === "success") {
                        console.log("Log out successfully");
                        window.location.href = '/';  // This will change the URL and reload the page
                    }
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        }
    }

    // side navbar
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div>

            {/* font links */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&display=swap" rel="stylesheet"></link>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@100..400&family=Protest+Guerrilla&display=swap" rel="stylesheet"></link>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>


            <Signin />
            <Signup />



            {/* Navbarn if login not complete */}
            {!login &&
                <>
                    <nav id="navbar" className="navbar-container">
                        <div className="container">
                            {/* header */}
                            <header className="border-bottom">
                                <div className="row align-items-center">
                                    <div className="col-4 d-flex justify-content-start">
                                        {/* sign in page */}
                                        <>
                                            <button type="button" className="btn btn-outline-warning text-dark bg-warning" data-bs-toggle="modal" data-bs-target="#loginModal">
                                                Sign in
                                            </button>
                                        </>
                                    </div>
                                    <div className="col-4 pt-2 text-center">
                                        <Link className="text-body-emphasis text-decoration-none" to="/" style={{ fontFamily: "Playfair Display", fontSize: '2.25rem' }}>
                                            <p className="foodie" style={{ fontFamily: "'Protest Guerrilla', sans-serif", }}>
                                                Foodie
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end align-items-center">
                                        {/* sign up page */}
                                        <button type="button" className="btn btn-outline-warning text-dark bg-warning" data-bs-toggle="modal" data-bs-target="#signupModal">
                                            Sign up
                                        </button>
                                    </div>
                                </div>
                            </header>
                        </div>
                    </nav>
                </>
            }

            {login &&
                <>
                    {/* Navbarn if login done */}
                    <nav id="navbar" className="navbar-container">
                        <div className="container">
                            {/* header */}
                            <header className="border-bottom">
                                <div className="row flex-no wrap justify-content-between align-items-center">
                                    <div className="col-3 navbar_icon">
                                        <button onClick={toggleSidebar} className="btn nav_bar_icon">
                                            <i className={isOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
                                        </button>
                                    </div>
                                    <div className="col-2 pt-2">
                                        <Link className="text-body-emphasis text-decoration-none" to="/" style={{ fontFamily: "Playfair Display", fontSize: '2.25rem' }}>
                                            <p className="foodie" style={{ fontFamily: "'Protest Guerrilla', sans-serif", }}>
                                                Foodie
                                            </p>
                                        </Link>
                                    </div>
                                    <div className="col-7 d-flex justify-content-end align-items-center">
                                        {/* if loged in then... */}
                                        {login &&
                                            <>
                                                <nav className="third_navbar">
                                                    <ul className="nav nav-underline justify-content-between">
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/menu">
                                                            Menu
                                                        </NavLink>
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/discount">
                                                            Discounts
                                                        </NavLink>
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/cart">
                                                            Cart
                                                        </NavLink>
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/account">
                                                            Account
                                                        </NavLink>
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/contactus">
                                                            ContactUs
                                                        </NavLink>
                                                        <NavLink className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" to="/review">
                                                            Reviews
                                                        </NavLink>
                                                        <a className="nav-item nav-link link-body-emphasis text-success m-2" activeClassName="active" onClick={userLogout}>
                                                            Logout
                                                        </a>
                                                    </ul>
                                                </nav>
                                            </>
                                        }
                                    </div>
                                </div>
                            </header>
                        </div>
                    </nav>

                </>
            }


            {/* left side bar */}
            <div>
                {/* Sidebar */}
                <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                    <nav className="d-flex flex-column p-3 bg-body-tertiary" style={{ width: '280px' }}>
                        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                            <svg className="bi pe-none m-2" width="40" height="32"></svg>
                            <span className="fs-4"><img src={logo} alt="Foodie" style={{ height: "40px", width: "40px" }} />Foodie</span>
                        </a>
                        <hr />
                        <ul className="nav flex-column mb-auto nav nav-underline justify-content-between">
                            <NavLink exact className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/" onClick={closeSidebar}>
                                Home
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/menu" onClick={closeSidebar}>
                                Menu
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/discount" onClick={closeSidebar}>
                                Discounts
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/cart" onClick={closeSidebar}>
                                Cart
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/account" onClick={closeSidebar}>
                                Account
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/aboutus" onClick={closeSidebar}>
                                About us
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/contactus" onClick={closeSidebar}>
                                Contact us
                            </NavLink>
                            <NavLink className="nav-item nav-link link-body-emphasis text-success" activeClassName="active" to="/review" onClick={closeSidebar}>
                                Reviews
                            </NavLink>
                        </ul>
                        <hr />
                        <div style={{ bottom: "0", width: "100%" }}>
                            <ul className="list-unstyled text-small shadow">
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    {login &&
                                        <><a type="button" className="btn btn-linkdropdown-item w-100" onClick={userLogout}>
                                            Log out</a>
                                        </>
                                    }
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Dark Overlay */}
                {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
            </div>

        </div>
    )
}

