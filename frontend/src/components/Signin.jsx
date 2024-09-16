import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';


function Signin() {

    const [formData, setFormData] = useState({ phone: '', otp: '' });
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showButton, setShowButton] = useState(true);
    const [loading, setLoading] = useState(false); // Add loading state


    // save in use state
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // verify number
    const validatePhoneNumber = (phoneNumber) => {
        const phone = /^[0-9]{10}$/; // Simple regex for 10-digit phone numbers
        return phone.test(phoneNumber);
    };

    // when submit
    const handleSubmit = async () => {

        if (!validatePhoneNumber(formData.phone)) {
            setErrorMessage('Please enter a valid 10-digit phone number.');
            return;
        }
        setLoading(true); // Show spinner when form is submitted

        try {
            const response = await axios.post(`${API_BASE_URL}/check-phone/`, {
                phone: formData.phone,
                type: "signin"
            });
            console.log('OTP Response is:', response.data);

            if (response.data.status === "success") {
                setShowOtpInput(true); // Show OTP input if phone exists
                setErrorMessage(); // Clear any previous error messages
            } else {
                setErrorMessage('Phone number not found. Please sign up.');
            }
        } catch (error) {
            // Check if error response exists and log appropriately
            if (error.response) {
                console.error('API Error:', error.response.data);
                setErrorMessage(error.response.data.message || 'There was an error processing your request.');
            } else {
                console.error('API Error:', error.message);
                setErrorMessage('There was an error processing your request.');
            }
        } finally {
            setLoading(false); // Hide spinner after processing
        }
        setShowButton(false);
    };


    const handleOtpSubmit = async () => {
        try {
            console.log(formData.otp, formData.phone);

            const response = await axios.post(`${API_BASE_URL}/verify-otp/`, {
                phone: formData.phone,
                otp: formData.otp,
                type: "signin"
            });

            if (response.data.status === 'success') {
                alert(response.data.message);

                document.cookie = `sessionid=${response.data.session_key}; path=/;`;

                // close the modal
                const modal = document.getElementById('loginModal');
                const modalInstance = window.bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            } else if (response.data.status === "error") {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage('There was an error processing your request.');
            console.error(error);
        }
    };

    // resend
    const handleResendOtp = () => {
        handleSubmit(); // Resend OTP by calling the submit function again
    };

    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="loginModalLabel">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className='text-center'>
                        {errorMessage && <div className="text-danger"> {errorMessage}</div>}
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                id="phone"
                                value={formData.phone}
                                name="phone"
                                onChange={handleInputChange}
                                className="form-control"
                                required
                                placeholder="Enter your phone number"
                            />
                        </div>

                        {showOtpInput && (
                            <div className="form-group mt-3">
                                <label htmlFor="otp" className="form-label">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={formData.otp}
                                    onChange={handleInputChange}
                                    name="otp"
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
                        )}
                    </div>
                    <div className="modal-footer">
                        {showButton && (
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
