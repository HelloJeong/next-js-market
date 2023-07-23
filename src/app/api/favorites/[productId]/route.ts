import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface ParamsType {
  productId?: string;
}

export async function POST(request: Request, { params }: { params: ParamsType }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: ParamsType }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { productId } = params;

  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((f) => f !== productId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
