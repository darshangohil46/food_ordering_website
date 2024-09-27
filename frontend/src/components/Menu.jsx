import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';


const Menu = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);

  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState(''); // State to manage input field text
  const [userData, setUserData] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  // for add to cart
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // show alert if gujarti not found
  const [alertMessageForCart, setAlertMessageForCart] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // check auth
  useEffect(() => {
    axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
      .then(response => {
        // console.log("(Menu) Response Data:", response.data);
        setUserData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, [navigate]);

  // get menu items from django
  useEffect(() => {
    axios.get(`${API_BASE_URL}/menuitems/`)
      .then(response => {
        setMenuItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  // search
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log('Search Text:', event.target.value);
    // Optionally filter items based on search text
    const filtered = menuItems.filter(item =>
      item.restaurant_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };


  const handleOrder = () => {
    console.log('Ordered item:', selectedItem);
    console.log('Quantity:', quantity);

    const cartData = {
      user: userData.user_data.id,
      cart_details: {
        img: selectedItem.img_url,
        item_id: selectedItem.id,
        name: selectedItem.restaurant_name,
        type: selectedItem.type,
        price: selectedItem.price,
        address: selectedItem.address
      },
      quantity: quantity,
      ordered: false,  // or true if you want to mark it as ordered
      last_updated: new Date().toISOString(),
    };

    console.log(cartData);

    axios.post(`${API_BASE_URL}/add-to-cart/`, cartData, { withCredentials: true })
      .then(response => {
        console.log("Cart updated successfully:", response.data);
        // alert("Item added Successfully...")
        setAlertMessage("Item added To Cart Successfully...");
        handleCloseModal();
      })
      .catch(error => {
        console.error("There was an error adding to cart!", error);
      });

    handleCloseModal();
  };

  const handleShowModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  // items by category like pizza, and any other
  const filterByCategory = (category) => {
    setSelectedCategory(category);

    let categoryEndpoint;
    if (category === 'Pizza') {
      categoryEndpoint = `${API_BASE_URL}/pizza-burger/`;
    } else if (category === 'Burger') {
      categoryEndpoint = `${API_BASE_URL}/dessert/`;
    } else if (category === 'Gujarati') {
      categoryEndpoint = `${API_BASE_URL}/gujarati/`;
    } else if (category === 'Punjabi') {
      categoryEndpoint = `${API_BASE_URL}/punjabi/`;
    } else if (category === 'South Indian') {
      categoryEndpoint = `${API_BASE_URL}/southindian/`;
    } else if (category === "All") {
      categoryEndpoint = `${API_BASE_URL}/menuitems/`;
    }

    axios.get(categoryEndpoint)
      .then(response => {
        setMenuItems(response.data);
        setFilteredItems(response.data)
        setAlertMessageForCart("")
      })
      .catch(error => {
        setMenuItems([])
        setFilteredItems([])
        setAlertMessageForCart(`${category} Not Found`)
        console.error(`Error fetching ${category} menu items:`, error)
      })
  };

  return (
    <>
      {/* Alert message for add to cart */}
      {alertMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {alertMessage}
          <button type="button" className="btn-close" onClick={closeAlert}></button>
        </div>
      )}

      <div className="container mt-4">
        <h2 className="text-center">Menu Items</h2>
        <div className="d-flex justify-content-end mb-3">
          <div className="form-group w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Search by restaurant name"
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* manu Navbar */}
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* navbar */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'Pizza' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('Pizza')}
                  >
                    Pizza-Burger
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'Burger' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('Burger')}
                  >
                    Dessert
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'Gujarati' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('Gujarati')}
                  >
                    Gujarati
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'Punjabi' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('Punjabi')}
                  >
                    Punjabi
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'South Indian' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('South Indian')}
                  >
                    South-Indian
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn ${selectedCategory === 'All' ? 'text-danger' : ''}`}
                    onClick={() => filterByCategory('All')}
                  >
                    All
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* cards */}
        <div className="row">

          {alertMessageForCart && (
            <div className="m-4 alert alert-danger fade show" role="alert">
              {alertMessageForCart}
            </div>
          )}

          {/* show items  */}
          {filteredItems.map(item => (
            <div className="col-md-6" style={{ padding: "50px" }} key={item.id}>
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="menu_card col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary-emphasis">{item.type}</strong>
                  <h3 className="mb-0">{item.restaurant_name}</h3>
                  <p className="card-text mb-auto"></p>
                  <p className="card-text mb-auto"><strong>Price:</strong> ₹{item.price}</p>
                  <p className="card-text mb-auto"><strong>Address:</strong> {item.address}</p>

                  {userData &&
                    <>
                      <a className="icon-link gap-1 icon-link-hover stretched-link" onClick={() => handleShowModal(item)}>
                        Add to Cart
                      </a>
                    </>
                  }
                </div>
                <div className="col-auto d-lg-block">
                  <img src={item.img_url} alt={item.restaurant_name} className="bd-placeholder-img menu_card" width="250px" height="250px" />
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Modal for quntity */}
        {showModal && selectedItem && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order {selectedItem.restaurant_name}</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <p><strong>Type:</strong> {selectedItem.type}</p>
                  <p><strong>Price:</strong> ₹{selectedItem.price}</p>
                  <p><strong>Address:</strong> {selectedItem.address}</p>
                  <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-warning" onClick={handleOrder}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default Menu;
