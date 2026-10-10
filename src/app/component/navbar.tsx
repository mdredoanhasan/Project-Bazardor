import CategoryNavLinks, { type ProductCategory } from "./categoryNavLinks";

const Navbar = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  const data: ProductCategory[] = await res.json();

  return (
    <nav className="border-b border-b-black/10">
      <div className="container mx-auto my-3">
        <CategoryNavLinks categories={data} />
      </div>
    </nav>
  );
};

export default Navbar;
