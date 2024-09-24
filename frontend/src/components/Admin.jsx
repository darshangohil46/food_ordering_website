import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/admin-orders/", {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })
            .then((response) => {
                setOrders(response.data.orders);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching order data:", error);
                setLoading(false);
            });
    }, []);

    const handleDeleteOrder = (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order?");
        if (confirmDelete) {
            axios
                .post(`http://localhost:8000/api/delete-order/`, { order_id: orderId }, {
                    withCredentials: true,
                })
                .then((response) => {
                    console.log(`Order ${orderId} deleted.`);
                    setOrders(orders.filter((order) => order.id !== orderId));
                })
                .catch((error) => {
                    console.error(`Error deleting order ${orderId}:`, error);
                });
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h2 className="text-center mb-0">Admin [show all Orders]</h2>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-bordered table-responsive">
                        <thead className="thead-light">
                            <tr>
                                <th>Complete Order</th>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Amount</th>
                                <th>Quantity</th>
                                <th>Discount</th>
                                <th>Address</th>
                            </tr>
                            <tr>
                                <th colSpan="10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No orders available.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <>
                                        <tr key={order.id}>
                                            <td>
                                                <div>
                                                    <button className="btn btn-danger" onClick={() => handleDeleteOrder(order.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{order.order_id}</td>
                                            <td>{order.user}</td>
                                            <td>{order.name}</td>
                                            <td>{order.email}</td>
                                            <td>{order.phone}</td>
                                            <td>₹{order.amount.toFixed(2) * order.quantity}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.discount}</td>
                                            <td>{order.address}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Restaurant Name:</strong> {order.order_details.name} <br />
                                            </td>
                                            <td>
                                                <strong>Address:</strong> {order.order_details.address} <br />
                                            </td>
                                            <td>
                                                <strong>Price:</strong> {order.order_details.price} <br />
                                            </td>
                                            <td>
                                                <strong>Type:</strong> {order.order_details.type} <br />
                                            </td>
                                            <td>
                                                <img src={order.order_details.img} alt={order.order_details.name} style={{ width: "150px" }} />
                                            </td>
                                        </tr>
                                        <br />
                                    </>
                                ))

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
