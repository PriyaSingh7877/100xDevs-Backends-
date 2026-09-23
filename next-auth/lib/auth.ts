import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH_CONFIG = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                // yahan email/password fields honge (diff mein cut ho gaya, but same jaisa humne kiya)
            },
            async authorize(credentials) {
                // yahan authorize logic hoga
            }
        })
    ],
    callbacks: {
        // session callback (diff mein partial dikha)
        async session({ session, token }) {
            return session
        }
    },
    pages: {
        signIn: '/signin',
    }
}