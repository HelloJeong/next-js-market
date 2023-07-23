import prisma from "@/lib/prismadb";

interface Params {
  productId?: string;
}

export default async function getProductById(params: Params) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        user: true, // 연결된 user도 불러오기
      },
    });

    if (!product) {
      return null;
    }

    return product;
  } catch (err: any) {
    throw new Error(err);
  }
}
