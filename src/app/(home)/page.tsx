import Container from "@/components/DesignBoxes/Container";
import getProducts, { ProductsParams } from "../actions/getProducts";
import EmptyState from "@/components/Home/EmptyState";
import ProductCard from "@/components/Home/ProductCard";
import getCurrentUser from "../actions/getCurrentUser";
import FloatingButton from "@/components/Home/FloatingButton";
import Categories from "@/components/categories/Categories";
import Pagination from "@/components/Pagination/Pagination";
import { PRODUCTS_PER_PAGE } from "@/constants";

interface HomeProps {
  searchParams: ProductsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams?.page;
  const pageNum = typeof page === "string" ? +page : 1;

  const currentUser = await getCurrentUser();
  const products = await getProducts(searchParams);

  return (
    <Container>
      {/* Category */}
      <Categories />

      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products.data.map((product) => (
              <ProductCard key={product.id} currentUser={currentUser} data={product} />
            ))}
          </div>
          {/* pagination */}
          <Pagination page={pageNum} totalItems={products.totalItems} perPage={PRODUCTS_PER_PAGE} />

          {/* floatingButton */}
          <FloatingButton href="/products/upload">+</FloatingButton>
        </>
      )}
    </Container>
  );
}
