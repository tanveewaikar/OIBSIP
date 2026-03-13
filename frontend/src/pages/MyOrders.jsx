import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handlePayment = async (orderId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders/verify-payment",
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      //Update UI after payment
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, paymentStatus: "Paid" } : order,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Order Received") return "secondary";
    if (status === "In Kitchen") return "warning";
    if (status === "Sent to Delivery") return "primary";
    if (status === "Delivered") return "success"

    return "secondary";
  };

  const getPaymentColor = (paymentStatus) => {
    if (paymentStatus === "Paid") return "success";
    if (paymentStatus === "Pending") return "danger";
    return "secondary";
  };

  return (
    <div className="container page-container mt-4">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="card mt-3 shadow-sm" key={order._id}>
            <div className="card-body">
            <h5>Order ID: {order._id.slice(-8)}</h5>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>Base:</strong> {order.pizza.base.name}
            </p>

            <p>
              <strong>Sauce:</strong> {order.pizza.sauce.name}
            </p>

            <p>
              <strong>Cheese:</strong> {order.pizza.cheese.name}
            </p>

            <p>
              <strong>Veggies:</strong>{" "}
              {order.pizza.veggies.length > 0
                ? order.pizza.veggies.map((v) => v.name).join(", ")
                : "None"}
            </p>

            <p>
              <strong>Meat:</strong>{" "}
              {order.pizza.meat.length > 0
                ? order.pizza.meat.map((m) => m.name).join(", ")
                : "None"}
            </p>

            <p>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge bg-${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              <span
                className={`badge bg-${getPaymentColor(order.paymentStatus)}`}
              >
                {order.paymentStatus}
              </span>
            </p>

            {order.paymentStatus !== "Paid" && (
              <button
                className="btn btn-primary mt-2"
                onClick={() => handlePayment(order._id)}
              >
                Pay Now
              </button>
            )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
