import coverImg from "../assets/menu/banner3.jpg";
import dessertImg from "../assets/menu/dessert-bg.jpg";
import pizzaImg from "../assets/menu/pizza-bg.jpg";
import saladImg from "../assets/menu/salad-bg.jpg";
import soupImg from "../assets/menu/soup-bg.jpg";
import SectionTitle from "../components/SectionTitle";
import MenuCategory from "../components/MenuCategory";
import useMenu from "../Hooks/useMenu";
import Cover from "../components/Cover";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Cover img={coverImg} title={"our menu"}></Cover>
      <SectionTitle
        subHeading={"---Don't miss---"}
        heading={"TODAY'S OFFER"}
      ></SectionTitle>

      {/* offered items  */}
      <MenuCategory items={offered} title={'offered'}></MenuCategory>

      {/* Deserts items  */}
      <MenuCategory
        items={dessert}
        title={"desserts"}
        coverImg={dessertImg}
      ></MenuCategory>

      {/* pizza items  */}
      <MenuCategory
        items={pizza}
        title={"pizza"}
        coverImg={pizzaImg}
      ></MenuCategory>

      {/* salad items  */}
      <MenuCategory
        items={salad}
        title={"salad"}
        coverImg={saladImg}
      ></MenuCategory>

      {/* soup items  */}
      <MenuCategory
        items={soup}
        title={"soup"}
        coverImg={soupImg}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
