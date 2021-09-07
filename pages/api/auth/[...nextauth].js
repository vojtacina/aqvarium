
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "../../../lib/clients/prisma";
import Adapters from "next-auth/adapters";
import axios from "axios";




const options = {
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        let user = prisma.user.findFirst({
          where: {
            username: credentials.username,
            password: credentials.password
          }
        })

        if (!user) {
          user = prisma.user.create({
            data: {
              username: credentials.username,
              password: credentials.password
            }
          })
        }
        return user

      }

    }
    )
  ],

  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: 'user',
      Account: 'account',
      Session: 'session',
      VerificationRequest: 'verificationRequest'
    }
  }),
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export default NextAuth(options)