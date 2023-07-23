import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

interface useFavoriteProps {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: useFavoriteProps) => {
  const router = useRouter();
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      toast.warn("로그인이 필요합니다.");
      return;
    }

    try {
      let request;
      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      router.refresh();
      toast.success("성공!");
    } catch (err) {
      console.error(err);
      toast.error("실패!");
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
