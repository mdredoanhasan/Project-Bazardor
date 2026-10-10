import CategoryProductList from "@/app/component/categoryProductList";
import { getByCategory } from "@/app/lib/products";
import { notFound } from "next/navigation";

export const instant = false;

const toBn = (n: number) => n.toLocaleString("bn-BD");

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const data = await getByCategory(categoryId);

  if (data.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto mt-8 mb-20 space-y-4 px-4 sm:mt-14 sm:mb-32">
      {/* Category header */}
      <div className="flex items-center gap-3 rounded-2xl border bg-white p-4">
        <span className="text-4xl">{data[0].categoryIcon}</span>
        <div>
          <h1 className="text-xl font-bold">{data[0].categoryNameBn}</h1>
          <p className="text-sm text-gray-600">
            {toBn(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        মোট {toBn(data.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <CategoryProductList products={data} />
    </div>
  );
};

export default CategoryPage;