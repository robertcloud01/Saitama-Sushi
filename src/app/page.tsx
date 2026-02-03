"use client";

import { Hero } from "@/components/home/Hero";
import { CategoriesCarousel } from "@/components/home/CategoriesCarousel";
import { PopularDishesSection } from "@/components/home/PopularDishesSection";
import { PromoBanner } from "@/components/home/PromoBanner";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BrandsMarquee } from "@/components/home/BrandsMarquee";
import { FloatingMenuButton } from "@/components/layout/FloatingMenuButton";
import { Footer } from "@/components/layout/Footer";


export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-black min-h-screen">
      <Hero />
      <CategoriesCarousel />
      <PopularDishesSection />
      <BrandsMarquee />
      <PromoBanner />
      <ReviewsSection />
      <Footer />
      <FloatingMenuButton />
    </div>
  );
}
