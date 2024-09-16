import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';


export default function Cart() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [makePayment, setMakePayment] = useState(null)

  const userId = userData?.user_data?.id;

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        console.log("(Menu) Response Data:", response.data);
        setUserData(response.data);

      })
      .catch(error => {
        navigate('/');
        alert("Please! Login first or Create Account on our website")
        console.error("There was an error fetching the data!", error);
      });

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cart-items/`, {
          params: { user_id: userData.user_data.id }
        });
        const unOrderedItems = response.data.filter(item => !item.ordered);
        setCartItems(unOrderedItems);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (userId) {
      fetchCartItems();
    }

  }, [navigate, userId]);



  // if confirm ordr then ask for payment
  const handleConfirmOrder = (itemId, cart_details) => {
    const code = prompt("If You have any Discount code then Enter...")

    const ask_confirm = window.confirm("Do you want to confirm and process? After Confirm you cann't cancel it.")
    if (ask_confirm) {
      axios.post(`${API_BASE_URL}/generate-payment/`, {
        code: code,
        item_id: itemId,
        user_id: userData.user_data.id,
        phone: userData.user_data.phone,
        email: userData.user_data.email,
        order_details: cart_details,
        name: userData.user_data.first_name + " " + userData.user_data.last_name
      }, { withCredentials: true })
        .then(response => {
          console.log(`Payment for ${itemId} done.`);
          setMakePayment(response.data)
          console.log(makePayment);
          return
        })

      axios.post(`${API_BASE_URL}/confirm-order/${itemId}/`)
        .then(response => {
          console.log('Order confirmed:', response.data);
          // Update cart items state or refetch data
        })
        .catch(error => console.error('Error confirming order:', error))
    }
    window.location.reload();
  };

  // Remove from Cart
  const handleRemoveFromCart = (itemId) => {
    let askRemove = window.confirm("Do you want to remove this item from cart?")
    console.log(itemId);

    if (askRemove) {
      axios.post(`${API_BASE_URL}/remove-from-cart/`,
        { id: itemId })
        .then(response => {
          console.log('Item removed from cart:', response.data);
          console.log(response.data.message);

          setCartItems(cartItems.filter(item => item.id !== itemId));
        })
        .catch(error => console.error('Error removing item from cart:', error));
    }
    window.location.reload();
  };

  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }


  return (
    <div>

      <div className="container mt-4">
        <div className="row">
          <h4 className="card-title text-dark text-center">Cart Items</h4>

          {/* class=card place here */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="col-md-6">
                <div className="mb-3">
                  <div className="card-body">
                    <ul className="list-group">
                      <li key={index} className="list-group-item">
                        <div>
                          <h5 className='text-warning' style={{ textAlign: "center" }}>{item.cart_details.name}</h5>
                          <p><strong>Item ID:</strong> {item.cart_details.item_id}</p>
                          <p><strong>Price:</strong> {item.cart_details.price}</p>
                          <p><strong>Quantity:</strong> {item.cart_details.quantity}</p>
                          <p><strong>Rating:</strong> {item.cart_details.rating}</p>
                          <p><strong>Timing:</strong> {item.cart_details.timing}</p>
                          <p><strong>Type:</strong> {item.cart_details.type}</p>
                          <p><strong>Address:</strong> {item.cart_details.address}</p>
                          <p><strong>Last Updated:</strong> {new Date(item.last_updated).toLocaleString()}</p>
                          <p><strong>Ordered Status:</strong> {item.ordered ? "Yes" : "No"}</p>
                          <button
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleConfirmOrder(item.id, item.cart_details)}
                          >
                            Confirm Order
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove from Cart
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <li className="list-group-item text-center">No items found.</li>
          )}


        </div>
      </div>
    </div>
  )
}
