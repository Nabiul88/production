import { useEffect, useState } from "react";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    };

    fetchOrders();
  }, []);

  // Sort orders by date
    const sortedOrders = orders?.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB - dateA;
    });

  // Handle order status change
  const handleStatusChange = (orderId, newStatus) => {
    const updateStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/orders/${orderId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrders(data);
        } else {
          console.error("Failed to update order status:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating order status:", error.message);
      }
    };
      updateStatus();
      window.location.reload();
  };

  return (
    <div className="container mx-auto ml-3">
      <h1 className="text-3xl font-bold mb-6">Order Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Table Number</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              sortedOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderDate}</td>
                  <td>{order.tableNumber}</td>
                  <td>
                    <ul>
                      {order.items.map((item) => (
                        <li
                          key={item._id}
                        >{`${item.name} - ${item.price}/=`}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{`${order.totalPrice}/=`}</td>
                  <td>
                    <select
                      value={order.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="select select-bordered"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
