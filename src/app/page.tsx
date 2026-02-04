import { Hero } from "@/components/home/Hero";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PopularDishesSection } from "@/components/home/PopularDishesSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { FloatingMenuButton } from "@/components/layout/FloatingMenuButton";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Fetch popular products from Supabase
  const { data: products, error } = await supabase
    .from('Product')
    .select('*, category:Category(*)')
    .eq('isPopular', true)
    .limit(12);

  if (error) {
    console.error("Supabase Error in Page:", error);
  } else {
    console.log("Supabase Products Found:", products?.length);
  }

  const popularProducts = (products || []).map(p => ({
    ...p,
    image: p.image ?? '/images/placeholder.png',
    // Ensure category is correctly mapped if needed, though Supabase returns it nested
  }));

  return (
    <main className="flex flex-col gap-0 bg-black min-h-screen">
      <Hero />
      <CategoriesCarousel />
      <FeaturedProducts />
      <PopularDishesSection products={popularProducts} />
      <PromoBanner />
      <ReviewsSection />
      <BrandsMarquee />
      <FloatingMenuButton />
      <Footer />
    </main>
  );
}
