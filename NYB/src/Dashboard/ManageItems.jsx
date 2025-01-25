import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import SectionTitle from "../components/SectionTitle";
import useMenu from "../hooks/useMenu";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/menu/${item._id}`, {
          method: "DELETE",
        }).then((res) => {
          console.log("deleted res", res.data);

          window.location.reload();
          refetch();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
    };
    
    const handleIsAvailable = (itemId, newAvailability) => {
        const updateStatus = async () => {
          try {
            const response = await fetch(
              `http://localhost:5000/items/${itemId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ isAvailable: newAvailability }),
              }
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              window.location.reload();
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
    <div className="w-full">
      <SectionTitle
        heading="Manage All Items"
        subHeading="Hurry up"
      ></SectionTitle>
      <div className="overflow-x-auto w-full max-h-[600px]">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                    </div>
                  </div>
                    </td>
                    <td>
                    <select
                      value={item.isAvailable || "available"}
                      onChange={(e) =>
                        handleIsAvailable(item._id, e.target.value)
                      }
                      className="select select-bordered"
                    >
                      <option value="available">Available</option>
                      <option value="not-available">Not-available</option>
                    </select>
                  </td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className="btn btn-ghost bg-red-600  text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageItems;
