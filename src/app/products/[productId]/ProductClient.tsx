"use client";
import Container from "@/components/DesignBoxes/Container";
import Button from "@/components/Forms/Button";
import ProductHead from "@/components/Products/ProductHead";
import ProductInfo from "@/components/Products/ProductInfo";
import { categories } from "@/components/categories/Categories";
import { Product, User } from "@prisma/client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductClientProps {
  product: Product & { user: User };
  currentUser?: User | null;
}

const ProductClient: React.FC<ProductClientProps> = ({ product, currentUser }) => {
  const router = useRouter();

  const KakaoMap = dynamic(() => import("@/components/KakaoMap/KakaoMap"), { ssr: false });

  const category = categories.find((item) => item.path === product.category);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ProductHead
            title={product.title}
            imageSrc={product.imageSrc}
            id={product.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10">
            <ProductInfo
              user={product.user}
              category={category}
              createdAt={product.createdAt}
              description={product.description}
            />
            <div>
              <KakaoMap detailPage latitude={product.latitude} longitude={product.longitude} />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button label="이 유저와 채팅하기" onClick={() => router.push(`/chat`)} />
        </div>
      </div>
    </Container>
  );
};

export default ProductClient;
