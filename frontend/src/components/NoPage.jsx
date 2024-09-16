import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const NoPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title} className='text-warning'>404 - Page Not Found</h1>
            <p style={styles.message} className='text-danger'>Oops! The page you are looking for does not exist.</p>
            <button onClick={goHome} style={styles.button}>Go Home</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: '3rem',
        color: '#343a40',
    },
    message: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
        color: '#6c757d',
    },
    button: {
        padding: '0.5rem 1.5rem',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
    }
};

export default NoPage;
