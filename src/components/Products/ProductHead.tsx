import { User } from "@prisma/client";
import React from "react";
import Heading from "../DesignBoxes/Heading";
import Image from "next/image";
import HeartButton from "../Home/HeartButton";

interface ProductHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  currentUser?: User | null;
}

const ProductHead: React.FC<ProductHeadProps> = ({ title, imageSrc, id, currentUser }) => {
  return (
    <>
      <Heading title={title} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt="product" fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton productId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ProductHead;
