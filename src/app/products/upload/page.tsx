"use client";
import Button from "@/components/Forms/Button";
import Container from "@/components/DesignBoxes/Container";
import Input from "@/components/Forms/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "@/components/DesignBoxes/Heading";
import ImageUpload from "@/components/Forms/ImageUpload";
import { categories } from "@/components/categories/Categories";
import CategoryInput from "@/components/categories/CategoryInput";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProductUploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      latitude: 33.5563,
      longitude: 126.79581,
      imageSrc: "", // register  등록을 따로 안하기 때문에 setValue를 통해서 업데이트해줘야함
      price: 100,
    },
  });

  const imageSrc = watch("imageSrc");
  const category = watch("category");

  const KakaoMap = dynamic(() => import("@/components/KakaoMap/KakaoMap"), { ssr: false });

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value);
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/products", data)
      .then((res) => {
        console.log("res", res);
        router.push(`/products/${res.data.id}`);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
          <Heading title="Product Upload" subtitle="upload your product" />
          <ImageUpload
            onChange={(value) => {
              setCustomValue("imageSrc", value);
            }}
            value={imageSrc}
          />
          <Input
            id="title"
            label="Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="price"
            label="Price"
            formatPrice
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <hr />

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => {
              return (
                <div key={item.label} className="col-span-1">
                  <CategoryInput
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.path}
                    label={item.label}
                    icon={item.icon}
                    path={item.path}
                  />
                </div>
              );
            })}
          </div>
          <hr />
          {/* KakaoMap */}

          <KakaoMap setCustomValue={setCustomValue} latitude={latitude} longitude={longitude} />

          <Button label="상품 생성하기" />
        </form>
      </div>
    </Container>
  );
};

export default ProductUploadPage;
