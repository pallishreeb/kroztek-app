import Carousel from "@/components/Carousel";
// import SearchBar from "@/components/SearchBar";
// import Testimonials from "@/components/Testimonials";
// import ContactSection from "@/components/Contact";
import GuideCTA from "@/components/GuideCTA";
import ProductCarousel from "@/components/ProductCarousel";
import WhyChooseUs from "@/components/WhyChooseUs";
import Counter from "@/components/Counter";
// import { products } from "@/data/products";
// import SellingCount from "@/components/SellingCount";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Carousel />
      <Counter />
      <ProductCarousel />
      <WhyChooseUs />
      <GuideCTA />

      {/* <Testimonials /> */}

    </div>
  );
}
