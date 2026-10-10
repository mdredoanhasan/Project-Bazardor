import type { CommonType } from "@/app/component/commonType";
import { cacheLife } from "next/cache";

const productsUrl =
  "https://openapi.programming-hero.com/api/bazardor/products";

export async function getProducts(): Promise<CommonType[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(productsUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return (await res.json()) as CommonType[];
}

export async function getIncreased(limit = 6): Promise<CommonType[]> {
  const products = await getProducts();
  return products.filter((product) => product.change.pct > 0).slice(0, limit);
}

export async function getDecreased(limit = 6): Promise<CommonType[]> {
  const products = await getProducts();
  return products.filter((product) => product.change.pct < 0).slice(0, limit);
}

export async function getByCategory(
  category: string,
): Promise<CommonType[]> {
  const products = await getProducts();
  return products.filter((product) => product.category === category);
}

export async function getBySlug(
  slug: string,
): Promise<CommonType | undefined> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}
