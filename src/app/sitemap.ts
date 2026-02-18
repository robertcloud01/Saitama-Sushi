import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://saitama-delivery.vercel.app";

  const staticPaths = [
    "/",
    "/menu",
    "/satimoney",
    "/login",
    "/signup",
    "/profile",
    "/checkout",
  ];

  const productPaths = PRODUCTS.map((p) => `/product/${p.id}`);
  const allPaths = [...staticPaths, ...productPaths];

  const now = new Date();

  return allPaths.map((pathname) => ({
    url: `${baseUrl}${pathname}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: pathname === "/" ? 1 : 0.7,
  }));
}
