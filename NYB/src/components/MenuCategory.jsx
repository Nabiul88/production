import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";
import Cover from "./Cover";


const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div>
      {coverImg && <Cover img={coverImg} title={title}></Cover>}
      <div className="grid md:grid-cols-2 gap-8 my-12">
        {items.map((item, index) => (
          <MenuItem key={index} item={item}></MenuItem>
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn mx-auto block btn-outline mb-5 mt-4 border-b-4 border-t-0 border-x-0 text-white">
          order now
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
