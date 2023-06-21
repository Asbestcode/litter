import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
// import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    //   EmailProvider({
    //     server: {
    //       host: process.env.EMAIL_SERVER_HOST,
    //       port: process.env.EMAIL_SERVER_PORT,
    //       auth: {
    //         user: process.env.EMAIL_SERVER_USER,
    //         pass: process.env.EMAIL_SERVER_PASSWORD,
    //       },
    //     },
    //     from: process.env.EMAIL_FROM,
    //   }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({token, session}) => {
      if (session?.user && token?.sub) {
          session.user.id = token.sub;
      }
      return session;
    },
  },
}
export default NextAuth(authOptions)