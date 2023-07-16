import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    // 원래있던 user types에 id를 추가해줌
    user?: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}
