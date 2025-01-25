import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUtensils, FaBook, FaUsers, FaList } from "react-icons/fa";
import { RiMenuSearchLine } from "react-icons/ri";
import { FaBasketShopping } from "react-icons/fa6";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open mt-5">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side border rounded-lg border-slate-600">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          <li>
            <NavLink to="/dashboard/admin">
              <FaHome></FaHome> Dashboard
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard/addItem">
              <FaUtensils></FaUtensils> Add an Item
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/dashboard/manageitems">
            <FaList /> Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manageorders">
              <FaBook></FaBook> Manage Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/kitchen">
              <FaUsers></FaUsers> Kitchen
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/additem">
              <FaBook></FaBook> Add Item
            </NavLink>
          </li>

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink to="/menu"><RiMenuSearchLine /> Our Menu</NavLink>
          </li>
          <li>
            <NavLink to="/order/salad"><FaBasketShopping />Order Food</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
