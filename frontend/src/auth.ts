import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import cookie from 'cookie'
import { cookies } from "next/headers";
import backUrl from "./config";

export const { 
    handlers: { GET, POST },
    signIn,
    auth
} = NextAuth({
    pages: {
        signIn: '/_component/auth/Login',
        newUser: '/signup',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const authResponse = await fetch(`${backUrl}/users/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userID: credentials.username,
                            password: credentials.password
                        }),
                    })

                    if (!authResponse.ok) {
                        console.log(authResponse)
                        return null
                    }

                    let setCookie = authResponse.headers.get('Set-Cookie')
                    if (setCookie) {
                        const parsed = cookie.parse(setCookie)
                        cookies().set('connect.sid', parsed['connect.sid'], parsed) 
                    }

                    const response = await authResponse.json()
                    const user = response.user;

                    return {
                        id: user.userID,
                        name: user.userID,
                        image: user.avatar,
                        ...response
                    }
                } catch (e) {
                    console.log(e)
                }

            },
        }),
    ] 
})