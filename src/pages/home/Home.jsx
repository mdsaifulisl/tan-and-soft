// import Button from "../../components/common/Button";
// components
import BestSellers from "../../components/ui/home/BestSellers";
import CategoryGrid from "../../components/ui/home/CategoryGrid";
import FeaturedBanner from "../../components/ui/home/FeaturedBanner";
import Hero from "../../components/ui/home/Hero";
import NewArrivals from "../../components/ui/home/NewArrivals";
import Testimonials from "../../components/ui/home/Testimonials";


// style
import "../../style/Home.css"

const Home = () => {
    return (
        <>
        <Hero />
        <CategoryGrid />
        <BestSellers />
        <FeaturedBanner />
        <NewArrivals />
        <Testimonials />
        </>
    );
};

export default Home;