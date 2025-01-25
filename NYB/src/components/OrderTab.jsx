import FoodCard from "./FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid md:grid-cols-3 gap-8 my-5"> {items.map((item, index) => (
            <FoodCard item={item} key={index}></FoodCard>
          ))}</div>    );
};

export default OrderTab;