import NextAuth, { type DefaultSession } from "next-auth";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental, // will be removed in future
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID_CLIENT as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  // callbacks: {
  //   jwt({ token, profile }) {
  //     if (profile) {
  //       console.log(profile);
  //       // token.id = profile.id;
  //       // token.image = profile.picture;
  //     }
  //     return token;
  //   },
  //   // authorized({ auth }) {
  //   //   return !!auth?.user; // this ensures there is a logged in user for -every- request
  //   // },
  // },
  pages: {
    signIn: "/sign-in", // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  },
});
