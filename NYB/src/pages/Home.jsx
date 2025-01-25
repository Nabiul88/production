import Banner from "../sections/Banner";
import Category from "../sections/Category";
import ChefsSection from "../sections/ChefsSection";
import Menu from "../sections/Menu";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Menu></Menu>
            <Category></Category>
            <ChefsSection></ChefsSection>
        </div>
    );
};

export default Home;