import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import API_BASE_URL from '../config';


export default function Contactus() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });


  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        console.log("Response Data:", response.data);
        setUserData(response.data);

        setFormData({
          name: response.data.user_data.first_name + " " + response.data.user_data.last_name || '',
          email: response.data.user_data.email || '',
        });

      })
      .catch(error => {
        navigate('/');
        alert("Please! Login first or Create Account on our website")
        console.error("There was an error fetching the data!", error);
        setError(error);
      });
  }, [navigate]);


  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const closeAlert = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when form is submitted

    try {
      const response = await axios.post(`${API_BASE_URL}/contactus/`, formData);
      if (response.data.status === 'success') {
        setSuccessMessage('Thank you for contacting us. We will get back to you shortly.');
        setErrorMessage('');
        setFormData({ name: '', email: '', message: '' }); // Reset form fields
      } else {
        setErrorMessage('Failed to send your message. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('There was an error processing your request.');
      // console.error('API Error:', error);
    } finally {
      setLoading(false); // Hide spinner after processing
    }
    window.location.reload();
  };

  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }

  return (
    <div className="container my-5">


      <h2 className='text-info'>Contact Us</h2>
      <p className='text-info'>If you have any questions, please feel free to reach out to us. We're here to help!</p>
      <div className="row">
        <div className="col-md-6">

          {/* send message to owner */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-warning">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                className="form-control text-success"
                required
                disabled="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-warning">Your Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                className="form-control text-success"
                required
                disabled="true"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label text-warning">Your Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-control text-success"
                rows="5"
                required
                placeholder='Enter Your Message...'
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Sending...</span>
                </div>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
              {successMessage}
              <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close"></button>
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
              {errorMessage}
              <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close"></button>
            </div>
          )}
        </div>

        {/* side bar */}
        <div className="col-md-6">
          <h3>Our Contact Details</h3>
          <p><strong>Address:</strong> 123 Foodie Lane, Ahmedabad City, 382415</p>
          <p><strong>Email:</strong> support@foodie.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>

      </div>
    </div>
  );
}

