import Link from "next/link";
import React from "react";
interface ProductName {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();

  return (
    <div className="border border-b-black/10">
      <div className="container mx-auto mt-5 mb-5">
        {data.map((p: ProductName) => (
          <Link href={p.slug} className=" mr-8 " key={p.id}>
            {p.icon} {p.nameBn}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
