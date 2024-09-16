import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Signup() {
  const [formData, setFormData] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showRegisterButton, setShowRegisterButton] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state


  // append form data in use state
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // phone verify by regeex
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; // Simple regex for 10-digit phone numbers
    return phoneRegex.test(phoneNumber);
  };


  // send api data to django
  const sendDataDjango = async () => {
    if (!validatePhoneNumber(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/submit-data/`, formData);
      console.log('Response:', response.data);
      if (response.data.status === "success") {
        // close modal
        const modal = document.getElementById('signupModal');
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
        alert("Registration done");
      }
    } catch (error) {
      // setErrorMessage('There was an error processing your request.');
      console.error('API Error:', error.response ? error.response.data : error.message);
    }
  };


  // for check phone number
  const handleSubmit = async () => {

    if (!validatePhoneNumber(formData.phone)) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true); // Show spinner when form is submitted

    try {
      const response = await axios.post(`${API_BASE_URL}/check-phone/`, {
        phone: formData.phone,
        type: "signup"
      });

      if (response.data.status !== "success") {
        setErrorMessage(response.data.message);
      } else {
        setShowOtpInput(true); // Show OTP input if phone number is valid and not already registered
        setErrorMessage('');
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      // setErrorMessage('There was an error processing your request.');
      console.error('API Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Hide spinner after processing
    }
    setShowSubmitButton(false)
  };


  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp/`, {
        phone: formData.phone,
        otp: formData.otp,
        type: "signup"
      });

      if (response.data.status === 'success') {
        alert(response.data.message);
        setShowRegisterButton(true)
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // setErrorMessage('There was an error processing your request.');
      console.error(error);
    }
  };

  // resend
  const handleResendOtp = () => {
    handleSubmit(); // Resend OTP by calling the submit function again
  };


  return (
    <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="signupModalLabel">Sign Up</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className='text-center'>
            {errorMessage && <div className="text-danger"> {errorMessage}</div>}
            {successMessage && <div className="text-success"> {successMessage}</div>}
          </div>
          <div className="modal-body">
            <div className="form-group">
              <form method="post">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                  placeholder="Enter your phone number"
                />
              </form>
            </div>

            {showOtpInput && (
              <div>
                <div className="form-group mt-3">
                  <label htmlFor="otp" className="form-label">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter OTP"
                  />
                  <button type="button" className="btn btn-link" onClick={handleResendOtp}>
                    Resend OTP
                  </button>
                  <button type="submit" className="btn btn-success btn-sm mt-2" onClick={handleOtpSubmit}>
                    Verify OTP
                  </button>
                </div>

                {/* other data */}
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter your Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            )}
          </div>
          {/* modal footer */}
          <div className="modal-footer">
            {showSubmitButton && (
              <>
                <button type="submit" className="btn btn-success w-100" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <div className="spinner-border spinner-border-sm text-light" role="status">
                      <span className="visually-hidden">Sending...</span>
                    </div>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </>
            )}
            {showRegisterButton && (
              <button type="submit" className="btn btn-success w-100" onClick={sendDataDjango}>
                Register
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

