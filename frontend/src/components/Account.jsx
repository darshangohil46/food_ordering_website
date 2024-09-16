import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';


export default function Account() {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState(null);


  const userId = userData?.user_data?.id;

  // fetch user data
  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        setUserData(response.data);
        console.log("(Account) Response Data:", userData);

        // Set form data with user profile data
        setFormData({
          id: response.data.user_data.id,
          first_name: response.data.user_data.first_name || '',
          last_name: response.data.user_data.last_name || '',
          email: response.data.user_data.email || '',
          address: response.data.user_data.address || '',
          phone: response.data.user_data.phone || '',
          my_username: response.data.user_data.my_username || '',
        });
        setUserProfile(response.data); // Store full profile if needed
      })
      .catch(error => {
        navigate('/');
        alert("Please! Login first or Create Account on our website")
        console.error("There was an error fetching the data!", error);
      });


    // Fetch cart items when the component mounts
    if (userId) {
      axios.post(`${API_BASE_URL}/show_conformed/`, { user: userId })
        .then(response => {
          setCartItems(Array.isArray(response.data.message) ? response.data.message : []); // Ensure the response is an array
          console.log("Cart Items:", response.data.message); // Log the response to check its structure
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [navigate, userId]);


  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Example: Validates 10-digit phone numbers
    return phoneRegex.test(phone);
  };


  // store value in setformdata
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update user profile
  const handleUpdate = async () => {
    // Validate the phone number before sending the update request
    if (!validatePhoneNumber(formData.phone)) {
      setErrors({
        ...errors,
        phone: 'Please enter a valid 10-digit phone number.',
      });
      return; // Prevent the update if validation fails
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/update-profile/${formData.id}/`, formData);
      setUserProfile(formData);
      setIsEditing(false);
      setErrors({}); // Clear any previous errors
      alert(response.data.message)
      console.log(response.data.message); // Handle success message
    } catch (error) {
      console.error('Error updating profile:', error.response?.data);
    }
  };

  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">

          {/* class=card place here */}
          <div className="mb-3">
            <div className="card-body">
              <h4 className="card-title text-dark">Profile Details</h4>

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="first_name"
                  value={formData.first_name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="last_name"
                  value={formData.last_name || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {errors.phone && (
                  <div className="text-danger mt-1">
                    {errors.phone}
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="my_username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="my_username"
                  name="my_username"
                  value={formData.my_username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              {!isEditing ? (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-success mt-3"
                    onClick={handleUpdate}
                  >
                    Update Profile
                  </button>
                  <button
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">

          {/* class=card place here */}
          <div className="mb-3">
            <div className="card-body">
              <h4 className="card-title text-dark">My Orders</h4>
              <ul className="list-group">

                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <li key={index} className="list-group-item">
                      <div>
                        <h5 className="text-warning" style={{ textAlign: "center" }}>{item.cart_details.name}</h5>
                        <p><strong>Item ID:</strong> {item.cart_details.item_id}</p>
                        <p><strong>Price:</strong> {item.cart_details.price}</p>
                        <p><strong>Quantity:</strong> {item.cart_details.quantity}</p>
                        <p><strong>Rating:</strong> {item.cart_details.rating}</p>
                        <p><strong>Timing:</strong> {item.cart_details.timing}</p>
                        <p><strong>Type:</strong> {item.cart_details.type}</p>
                        <p><strong>Address:</strong> {item.cart_details.address}</p>
                        <p><strong>Last Updated:</strong> {new Date(item.last_updated).toLocaleString()}</p>
                        <p><strong>Ordered Status:</strong> {item.ordered ? "Yes" : "No"}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">No items found.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

