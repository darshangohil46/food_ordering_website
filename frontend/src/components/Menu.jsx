import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';


const Menu = () => {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedRatingRange, setSelectedRatingRange] = useState('');
  const [searchText, setSearchText] = useState(''); // State to manage input field text
  const [userData, setUserData] = useState(null);

  // const [showData, setShowData] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
  }, [navigate]);


  useEffect(() => {
    axios.get(`${API_BASE_URL}/menuitems/`)
      .then(response => {
        setMenuItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const filterByRating = (ratingRange) => {
    if (ratingRange) {
      const [minRating, maxRating] = ratingRange.split('-').map(Number);
      const filtered = menuItems.filter(item => {
        const rating = parseFloat(item.rating);
        return rating >= minRating && rating < maxRating;
      });
      setFilteredItems(filtered);
    } else {
      setFilteredItems(menuItems);
    }
    setSelectedRatingRange(ratingRange);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log('Search Text:', event.target.value);
    // Optionally filter items based on search text
    const filtered = menuItems.filter(item =>
      item.restaurant_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };



  // for add to cart
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    console.log('Ordered item:', selectedItem);
    console.log('Quantity:', quantity);

    const cartData = {
      user: userData.user_data.id,
      cart_details: {
        item_id: selectedItem.id,
        name: selectedItem.restaurant_name,
        type: selectedItem.type,
        price: selectedItem.price,
        rating: selectedItem.rating,
        address: selectedItem.address,
        timing: selectedItem.timing,
        quantity: quantity,
      },
      ordered: false,  // or true if you want to mark it as ordered
      last_updated: new Date().toISOString(),
    };

    console.log(cartData);


    axios.post(`${API_BASE_URL}/add-to-cart/`, cartData, { withCredentials: true })
      .then(response => {
        console.log("Cart updated successfully:", response.data);
        alert("Item added Successfully...")
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

  if (!userData) {
    return null;  // Return null if user data isn't loaded yet
  }


  return (
    <div className="container mt-4">
      <h2 className="text-center">Menu Items</h2>
      <div className="d-flex justify-content-end mb-3">
        <div className="form-group" style={{ position: 'relative', left: '-10px' }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by restaurant name"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="ratingDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Filter by Rating
          </button>
          <ul className="dropdown-menu" aria-labelledby="ratingDropdown">
            <li>
              <button className="dropdown-item" onClick={() => filterByRating('1-2')}>
                1 to 2
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => filterByRating('2-3')}>
                2 to 3
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => filterByRating('3-4')}>
                3 to 4
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => filterByRating('4-5')}>
                4 to 5
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => filterByRating('')}>
                All Ratings
              </button>
            </li>
          </ul>
        </div>

      </div>

      {/* cards */}
      <div className="row">
        {filteredItems.map(item => (
          <div className="col-md-6" style={{ padding: "50px" }} key={item.id}>
            <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="menu_card col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-primary-emphasis">{item.type}</strong>
                <h3 className="mb-0">{item.restaurant_name}</h3>
                <div className="mb-1 text-body-secondary"><strong>Rating:</strong> {item.rating}</div>
                <p className="card-text mb-auto"></p>
                <p className="card-text mb-auto"><strong>Price:</strong> {item.price}</p>
                <p className="card-text mb-auto"><strong>Address:</strong> {item.address}</p>
                <p className="card-text mb-auto"><strong>Timing:</strong> {item.timing}</p>
                <a className="icon-link gap-1 icon-link-hover stretched-link"
                  onClick={() => handleShowModal(item)}>
                  Add to Cart
                </a>
              </div>
              <div className="col-auto d-lg-block">
                <img src={item.img_url} alt={item.restaurant_name} className="bd-placeholder-img menu_card" width="250px" height="100%" />
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Modal for quntity */}
      {showModal && selectedItem && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order {selectedItem.restaurant_name}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Type:</strong> {selectedItem.type}</p>
                <p><strong>Price:</strong> {selectedItem.price}</p>
                <p><strong>Rating:</strong> {selectedItem.rating}</p>
                <p><strong>Address:</strong> {selectedItem.address}</p>
                <p><strong>Timing:</strong> {selectedItem.timing}</p>
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
                <button type="button" className="btn btn-primary" onClick={handleOrder}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Menu;
