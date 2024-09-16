import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Review() {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [message, setMessage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [login, setLogin] = useState(false)
    const [userData, setUserData] = useState([])

    // Fetch reviews
    useEffect(() => {
        // check user is logged in or not
        axios.get(`${API_BASE_URL}/check-authentication/`, { withCredentials: true })
            .then(response => {
                setUserData(response.data)
                setLogin(true)
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });

        // for get user reviews data
        const fetchReviewData = () => {
            axios.get(`${API_BASE_URL}/review/`)
                .then(response => {
                    console.log(response.data);

                    setReviews(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the reviews!", error);
                });
        }
        fetchReviewData()

        // const interval = setInterval(fetchReviewData, 1000);
        // return () => clearInterval(interval);
    }, []);

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle submit review
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { user: userData.user_data.id, rating: rating, review_text: reviewText };
        axios.post(`${API_BASE_URL}/review-submit/`, data, { withCredentials: true })
            .then(response => {
                console.log(response.data);

                setMessage("Review submitted successfully!");
                setRating(5);
                setReviewText("");
                setReviews(prevReviews => [response.data, ...prevReviews]); // Update review list
            })
            .catch(error => {
                console.error("There was an error submitting your review!", error);
                setMessage("Error submitting review. Please try again.");
            });
        window.location.reload();
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">User Reviews</h2>

            {/* Display reviews */}
            <div className="card mb-5">
                <div className="card-body">
                    <ul className="list-group">
                        {reviews.length > 0 ? reviews.map(review => (
                            <li key={review.id} className="list-group-item">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span><strong>User: </strong> {review.user_first_name} {review.user_last_name} - {review.user_my_username}
                                        </span>
                                    </div>
                                    <span><strong>Rating:</strong> {review.rating} - {["Poor", "Fair", "Good", "Very Good", "Excellent"][review.rating - 1]}</span>
                                </div>
                                <p className="mb-0 text-warning">{review.review_text}</p>
                                <small className="text-muted">Posted on: {new Date(review.created_at).toLocaleString()}</small>
                            </li>
                        )) : <p>No reviews yet. Be the first to write one!</p>}
                    </ul>
                </div>
            </div>

            {/* Submit review */}
            {login &&
                <>
                    <div className="card">
                        <div className="card-header">
                            <h4>Submit a Review</h4>
                        </div>
                        <div className="card-body">
                            {message && <div className={`alert ${message.includes("Error") ? 'alert-danger' : 'alert-success'}`}>{message}
                                {/* <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close"></button> */}
                            </div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="rating" className="form-label">Rating:</label>
                                    <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="form-select">
                                        <option value={1}>1 - Poor</option>
                                        <option value={2}>2 - Fair</option>
                                        <option value={3}>3 - Good</option>
                                        <option value={4}>4 - Very Good</option>
                                        <option value={5}>5 - Excellent</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="reviewText" className="form-label">Review:</label>
                                    <textarea
                                        id="reviewText"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        className="form-control text-success"
                                        rows="4"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit Review</button>
                            </form>
                        </div>

                    </div>
                </>
            }


        </div>
    )
}
