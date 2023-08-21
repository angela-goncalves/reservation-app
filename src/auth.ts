import NextAuth, { type DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// declare module "next-auth" {
//   interface Session {
//     user: {
//       /** The user's id. */
//       id: string;
//     } & DefaultSession["user"];
//   }
// }

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID_CLIENT as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};

// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID_CLIENT as string,
//       clientSecret: process.env.GOOGLE_SECRET as string,
//       // authorization: {
//       //   params: {
//       //     prompt: "consent",
//       //     access_type: "offline",
//       //     response_type: "code",
//       //   },
//       // },
//     }),
//   ],
//   // callbacks: {
//   //   async signIn({ account, profile }) {
//   //     if (account?.provider === "google") {
//   //       if (profile?.email && profile.email.endsWith("@example.com")) {
//   //         return true; // If the user's email ends with "@example.com"
//   //       } else {
//   //         return false; // If the user's email doesn't end with "@example.com"
//   //       }
//   //     }
//   //     // Do different verification for other providers that don't have `email_verified`
//   //     return true; // Do different verification for other providers that don't have `email_verified`
//   //   },
//   //   // authorized({ auth }: any) {
//   //   //   return !!auth?.user; // this ensures there is a logged in user for -every- request
//   //   // },
//   // },
//   // pages: {
//   //   signIn: "/sign-in", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
//   // },
// });
