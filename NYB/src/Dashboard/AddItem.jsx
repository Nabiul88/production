import { useState } from "react";

const AddMenuItem = () => {
  const [newItem, setNewItem] = useState({
    name: "",
    recipe: "",
    image: "",
    category: "",
    price: 0,
  });

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch("http://localhost:5000/addMenuItem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log("Item added successfully");
        // Optionally, you can redirect or perform any other action after adding the item
      } else {
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const categoryOptions = ["dessert", "soup", "salad", "pizza", "drinks", "offered"];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-md shadow-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Menu Item</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-900 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Recipe:</label>
        <textarea
          name="recipe"
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-900 text-white"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Image URL:</label>
        <input
          type="text"
          name="image"
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-900 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Category:</label>
        <select
          name="category"
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-900 text-white"
        >
          <option value="">Select Category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Price:</label>
        <input
          type="number"
          name="price"
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-700 rounded-md w-full bg-gray-900 text-white"
        />
      </div>
      <button
        onClick={handleAddItem}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Add Item
      </button>
    </div>
  );
};

export default AddMenuItem;