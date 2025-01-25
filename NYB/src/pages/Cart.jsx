import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
const Cart = () => {
  const [menu, setMenu] = useState([]);
  const [tableNumber, setTableNumber] = useState([]);
  const storedIds = JSON.parse(sessionStorage.getItem("orders")) || [];
  console.log(tableNumber);
  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  const cartItems = menu.filter((item) => storedIds.includes(item._id));
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleDeleteItem = (idToDelete) => {
    console.log(idToDelete);
    const updatedIds = storedIds.filter((id) => id !== idToDelete);
    sessionStorage.setItem("orders", JSON.stringify(updatedIds));
    window.location.reload();
  };

  const handlePayment = () => {
    const date = new Date();
    const orderDate = date.toLocaleDateString();
    const orderTime = date.toLocaleTimeString();
    const order = {
      tableNumber,
      items: cartItems,
      totalPrice,
      orderDate,
      orderTime,
      status: "pending",
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Thanks for ordering!",
            text: "Order placed successfully!",
            icon: "success",
          });
        }
        const checkoutUrl =
          "https://sandbox.sslcommerz.com/EasyCheckOut/testcdeda6b9ce3c3eb5ca09c4b7a39a5c7fb27";
        // Open the link in a new tab
        window.open(checkoutUrl, "_blank");
        sessionStorage.removeItem("orders");
        window.location.reload();
      });
  };
  const handleOrder = () => {
    const date = new Date();
    const orderDate = date.toLocaleDateString();
    const orderTime = date.toLocaleTimeString();
    const order = {
      tableNumber,
      items: cartItems,
      totalPrice,
      orderDate,
      orderTime,
      status: "pending",
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Thanks for ordering!",
            text: "Order placed successfully!",
            icon: "success",
          });
        }
        sessionStorage.removeItem("orders");
        window.location.reload();
      });
  };

  return (
    <div className="p-20 min-h-screen">
      {storedIds.length ? (
        <div className="overflow-x-auto">
          <div className="flex justify-between">
            <p className="font-bold text-xl my-5">
              Total items: {cartItems.length}
            </p>
            <select
              onChange={(e) => setTableNumber(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Choose your table!
              </option>
              <option>Table Number-01</option>
              <option>Table Number-02</option>
              <option>Table Number-03</option>
              <option>Table Number-04</option>
            </select>
          </div>
          <table className="table mx-auto text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action Button</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{item.name}</div>
                  </td>
                  <td>{item.price}/= </td>
                  <th>
                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Delete
                      <MdDeleteForever size={18} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-bold text-xl my-5 flex justify-end">
            Total Price: {totalPrice}/=
          </p>
          <hr /> {/* Line tag */}
          <div className="flex justify-end mt-5">
            {tableNumber.length ? (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
                />
                <button
                  onClick={handleOrder}
                  className="btn btn-outline btn-accent"
                >
                  Place Order
                </button>
                <button
                  onClick={handlePayment}
                  className="btn btn-outline btn-accent"
                >
                  Pay & Order
                </button>
              </div>
            ) : (
              <button className="btn btn-outline btn-accent" disabled>
                Select Table First
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-3xl font-bold mt-[40vh]">
          No item in cart
        </div>
      )}
    </div>
  );
};

export default Cart;
