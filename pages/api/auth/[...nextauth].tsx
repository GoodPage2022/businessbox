import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next"

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.clientId ?? "",
            clientSecret: process.env.clientSecret ?? "",
        }),
    ],
    secret: process.env.jwtSecret,
    callbacks: {
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    }
})