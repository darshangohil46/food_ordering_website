import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

export default function Discount() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const [discountData, setDiscountData] = useState([])
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        console.log("(discount) Response Data:", response.data);
        setUserData(response.data);

      })
      .catch(error => {
        navigate('/');
        alert("Please! Login first or Create Account on our website")
        console.error("There was an error fetching the data!", error);
      });

  }, [navigate]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/get-discount/`)
      .then(response => {
        setDiscountData(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }



  return (
    <div className="container">
      <div className="row">
        <h4 className='text-info'>Discount Coupans</h4>

        {/* cards */}
        {discountData.map((item) => (
          <div className="col-md-6" key={item.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-warning">{item.code}</h5>
                <p className="card-text">Discount: {item.discount_percentage}%</p>
                <p className="card-text">Expires on: {new Date(item.expiration_date).toLocaleDateString()}</p>
                <p className={`card-text ${item.is_active ? 'text-success' : 'text-danger'}`}>
                  {item.is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
