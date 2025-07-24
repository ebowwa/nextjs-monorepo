// src/types/next-auth.d.ts
import { User } from "next-auth"
import { JWT } from "next-auth/jwt"

type UserId = string

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId
    }
  }
}
// This code snippet extends the types provided by the NextAuth library to include custom properties in the JWT and Session interfaces.

// It imports the `User` type from "next-auth" and the `JWT` type from "next-auth/jwt".

// It defines a custom type `UserId` as a string.

// The `declare module "next-auth/jwt"` block extends the `JWT` interface to include a new property `id` of type `UserId`.

// The `declare module "next-auth"` block extends the `Session` interface to include a new property `id` in the nested `user` object. This ensures that the `user` object within the session contains the `id` property of type `UserId`.

// By extending these interfaces, developers can access the `id` property directly from the JWT and session objects returned by NextAuth, providing easy access to the user ID throughout the application.
