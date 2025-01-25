import { useEffect, useState } from "react";

const Kitchen = () => {
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



  return (
    <div className="container mx-auto ml-4">
      <h1 className="text-3xl font-bold mb-6">Order Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order Date</th>
              <th>Table Number</th>
              <th>Items</th>
              <th>Status</th>
              <th>Total Price</th>
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
                  <td>{order.status}</td>
                  <td>{`${order.totalPrice}/=`}</td>
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

export default Kitchen;
