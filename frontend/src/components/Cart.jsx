import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config';


export default function Cart() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const userId = userData?.user_data?.id;
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // user auth and get cart datas
  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        // console.log("(Cart) Response Data:", response.data);
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
  const handleConfirmOrder = (cartItems) => {
    console.log(cartItems);
    const code = prompt("If You have any Discount code then Enter...")
    console.log(code);
    const ask_confirm = window.confirm("Do you want to confirm and process? After Confirm you cann't cancel it.")
    if (ask_confirm) {
      const orderDetails = cartItems.map(item => ({
        img: item.cart_details.img,
        type: item.cart_details.type,
        address: item.cart_details.address,
        item_id: item.id,
        title: item.cart_details.name,
        price: item.cart_details.price,
        quantity: item.quantity,  // This is the user-selected quantity
      }));
      console.log(orderDetails);

      axios.post(`${API_BASE_URL}/generate-bill/`, {
        code: code,
        user_id: userData.user_data.id,
        phone: userData.user_data.phone,
        email: userData.user_data.email,
        order_details: orderDetails,
        name: userData.user_data.first_name + " " + userData.user_data.last_name,
      }, { withCredentials: true })
        .then(response => {
          console.log(`Payment for ${userData.user_data.id} done.`);
          window.location.reload()

          // for show generated bill
          const newWindow = window.open();
          if (newWindow) {
            const htmlContent = response.data.html;
            newWindow.document.write(htmlContent);

            // Create a download link for the PDF
            const downloadLink = newWindow.document.createElement('a');
            downloadLink.href = 'data:application/pdf;base64,' + response.data.pdf; // Assuming PDF content is base64
            downloadLink.download = 'order_confirmation.pdf'; // Set the file name for download
            downloadLink.textContent = 'Download PDF';
            downloadLink.style.display = 'block'; // Make sure the link is visible
            newWindow.document.body.appendChild(downloadLink);

          } else {
            console.error('Failed to open new window');
          }
          // return
        })

      // axios.post(`${API_BASE_URL}/confirm-order/${itemId}/`)
      //   .then(response => {
      //     console.log('Order confirmed:', response.data);
      //     // Update cart items state or refetch data
      //   })
      //   .catch(error => console.error('Error confirming order:', error))
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // window.location.reload();
    }, 5000);
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

  // fro increase quantity
  const handleIncreaseQuantity = (cartItemId) => {
    axios.post(`${API_BASE_URL}/increase-quantity/${cartItemId}/`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          console.log("Quantity increased", data.new_quantity);
          window.location.reload()
        } else {
          console.error("Error increasing quantity:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // for decrease quantity
  const handleDecreaseQuantity = (cartItemId, currentQuantity) => {
    if (currentQuantity === 1) {
      setAlertMessage("You cannot decrease the item quantity below 1.");
      return; // Stop here if the quantity is 1
    }

    axios.post(`${API_BASE_URL}/decrease-quantity/${cartItemId}/`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          console.log("Quantity decreased", data.new_quantity);
          window.location.reload()
        } else {
          console.error("Error decreasing quantity:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // aler pop up 
  const closeAlert = () => {
    setAlertMessage(null);
  };

  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }

  return (
    <div>

      {/* Alert message */}
      {alertMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" onClick={closeAlert}></button>
        </div>
      )}

      {loading ? (
        <div className="text-center" style={{ marginTop: '20%' }}>
          <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="sr-only">Loading...</span>
          </div>
        </div>) : (
        <>
          {/* cart data */}
          <div className="container mt-4">
            <div className="row">
              <h4 className="card-title text-dark text-center">Cart Items</h4>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <>
                    <div className="col-md-6 mb-4" key={index}>
                      <div className="card shadow-sm">
                        <div className="row g-0">
                          <div className="col-md-4">
                            <img
                              src={item.cart_details.img}
                              alt={item.restaurant_name}
                              className="img-fluid rounded-start"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body">
                              <h5 className="card-title text-center text-warning">
                                {item.cart_details.name}
                              </h5>
                              <p className="card-text">
                                <strong>Price:</strong> ₹{item.cart_details.price}
                              </p>
                              <p className="card-text">
                                <strong>Quantity:</strong> {item.quantity}
                              </p>
                              <p className="card-text">
                                <strong>Type:</strong> {item.cart_details.type}
                              </p>
                              <p className="card-text">
                                <strong>Address:</strong> {item.cart_details.address}
                              </p>
                              <p className="card-text">
                                <strong>Last Updated:</strong>{" "}
                                {new Date(item.last_updated).toLocaleString()}
                              </p>
                              <p className="card-text">
                                <strong>Ordered Status:</strong>{" "}
                                {item.ordered ? "Yes" : "No"}
                              </p>

                              {/* Quantity control buttons */}
                              <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
                                <button
                                  className="btn btn-sm btn-outline-warning me-2"
                                  onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                >
                                  -
                                </button>
                                <span className="fs-5">{item.quantity}</span>
                                <button
                                  className="btn btn-sm btn-outline-warning ms-2"
                                  onClick={() => handleIncreaseQuantity(item.id)}
                                >
                                  +
                                </button>
                              </div>

                              <div className="d-flex justify-content-between">
                                <button
                                  className="btn btn-md btn-outline-danger"
                                  onClick={() => handleRemoveFromCart(item.id)}
                                >
                                  Remove from Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))

              ) : (
                <div className="col text-center">
                  <div className="alert alert-info" role="alert">
                    No items found in your cart.
                  </div>
                </div>
              )}

              {cartItems.length > 0 && (
                <>
                  <button
                    className="btn btn-md btn-success"
                    onClick={() => handleConfirmOrder(cartItems)}
                  >
                    Confirm Order
                  </button>
                </>
              )}

            </div>
          </div>

        </>
      )}


    </div>
  )
}