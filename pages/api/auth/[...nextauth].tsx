import GoogleProvider from "next-auth/providers/google";
import type { Profile, TokenSet, User, Awaitable } from "next-auth";
import NextAuth from "next-auth/next";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.clientId ?? "",
      clientSecret: process.env.clientSecret ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          given_name: profile.given_name,
          family_name: profile.family_name,
        };
      },
    }),
  ],
  secret: process.env.jwtSecret,
  callbacks: {
    async session({ session, token, user }: any) {
      session.given_name = token.given_name;
      session.family_name = token.family_name;
      session.accessToken = token.accessToken;

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
        token.given_name = user.given_name;
        token.family_name = user.family_name;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
});
