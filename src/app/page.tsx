import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PopularDishesSection } from "@/components/home/PopularDishesSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { FloatingMenuButton } from "@/components/layout/FloatingMenuButton";
import { Footer } from "@/components/layout/Footer";
import { ProductService } from "@/services/product.service";

// Dynamic Imports for lower priority components
const ReviewsSection = dynamic(() => import("@/components/home/ReviewsSection").then(mod => mod.ReviewsSection), {
  loading: () => <div className="h-96 bg-black" />, // Simple placeholder
});

const BrandsMarquee = dynamic(() => import("@/components/home/BrandsMarquee").then(mod => mod.BrandsMarquee));

export const metadata = {
  title: "Saitama Delivery | Premium Sushi Experience",
  description: "Order the finest sushi in town. Fresh ingredients, masterful preparation, and lightning-fast delivery.",
};

export default async function Home() {
  const popularProducts = await ProductService.getPopularProducts(12);
  const featuredProducts = await ProductService.getAllProducts(); // In real app, create getFeaturedProducts

  return (
    <main className="flex flex-col gap-0 bg-black min-h-screen">
      <Hero />
      <CategoriesCarousel />
      <FeaturedProducts products={featuredProducts.slice(0, 8)} />
      <PopularDishesSection products={popularProducts} />
      <PromoBanner />
      <ReviewsSection />
      <BrandsMarquee />
      <FloatingMenuButton />
      <Footer />
    </main>
  );
}
