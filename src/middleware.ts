import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET }); // [...nextauth].ts의 secret과 같이
  const pathname = req.nextUrl.pathname;

  // 로그인된 유저만 접근 가능

  if (pathname.startsWith("/user") && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // 어드민 유저만 접근 가능
  if (pathname.startsWith("/admin") && session?.role !== "Admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 로그인된 유저는 로그인, 회원가입 페이지에 접근 불가

  if (pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// 로그인 된 사람만 여기에 접근이 가능
// 이게 있으면 이 경로에 왔을 때 아래의 middleware를 통과하게 되는 것임
// export const config = {
//   matcher: ["/admin/:path*", "/user"],
// };
