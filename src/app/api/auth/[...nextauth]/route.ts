import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { cookies } from 'next/headers';
import {delete_cookie} from "sfcookies";

// const cookieStore = await cookies()
export const authOptions = {

    secret: 'aergsergsrgsergf',
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials: {
                email: {  },
                password: {  }
            },
            async authorize(credentials, req) {

                // debugger;
                console.log(credentials);
                const cookieStore = await cookies();
                // console.log
                try {
                    const baseUrl: string = process.env.HOST_URL ?? '';
                    if (typeof baseUrl === "undefined") {
                        throw new Error('Unable to locate host Url');
                    }
                    let url: string = baseUrl + 'customer/login/login';
                    if (baseUrl.includes('local')) {
                        if (url.includes('?')) {
                            url += '&XDEBUG_SESSION_START=PHPSTORM';
                        } else {
                            url += '?XDEBUG_SESSION_START=PHPSTORM';
                        }
                    }

                    // return { id: "1", name: "Admin", email: "admin@example.com" }

                    const res = await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(credentials),
                        headers: { "Content-Type": "application/json" }
                    })
                    console.log(res)
                    const user = await res.json();
                    const hostUrl: string = process.env.HOST_URL ?? '';
                    const hostData = {
                        url: hostUrl,
                    };
                    cookieStore?.set('authToken', user.token);
                    // cookieStore?.set('host_url', hostUrl);

                    // window?.localStorage?.setItem('host_url', JSON.stringify( hostData ));
                    // If no error and we have user data, return it
                    if (res.ok && user) {
                        // cookieStore.set({
                        //     name: 'authToken',
                        //     value: user.token,
                        // })
                        // cookieStore?.set('u_id', user.id);
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            // image: user.avatar,
                            // permissions: user.permissions,
                            auth_token: user.token
                        };

                    } else if (res && user) {

                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/account'
    },
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    skipCSRFCheck: true,
    callbacks: {
        // @ts-ignore
        async session({ session, token }) {
            if (!session) return;
            if (token.sub == undefined) {
                return null;
            }

            const cookieStore = await cookies();
            const baseUrl: string = process.env.HOST_URL ?? '';
            if (typeof baseUrl === "undefined") {
                throw new Error('Unable to locate host Url');
            }
            //need to do a call to the API to get more details to add to the session
            let url: string = baseUrl + 'customer/customer/load/id?id=' + token.sub;
            if (baseUrl.includes('local')) {
                url += '&XDEBUG_SESSION_START=PHPSTORM';
            }
            let tkn = (cookieStore.get('authToken'))?.value;

            if (typeof tkn === 'string') {
                const request = new Request(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        'token': tkn,
                        'NokNok': 'front'
                    }
                });
                const loadUser: Response = await fetch(request);

                if (loadUser) {
                    const loadedUser = await loadUser.json();

                    if (loadedUser['state'] === 'success' && loadedUser['message'] === 'Customer found') {
                        const user = loadedUser['data'];
                        session.user.id = user['id'];
                        session.user.email = user['email'];
                        session.user.name = user['name'];

                        if (typeof user['image'] === "string" && user['image'].length > 0 && baseUrl.length > 0) {
                            let path: string = baseUrl + user['image'];
                            session.user.image = path;
                        } else {
                            session.user.image = undefined
                        }
                        session.userId = loadedUser['id'];
                    } else if (loadedUser['state'] === 'success' && loadedUser['message'] !== 'Customer found') {

                    } else {

                    }

                } else {
                    console.log(loadUser);
                }
            } else {
                cookieStore.delete('next-auth.callback-url');
                cookieStore.delete('next-auth.csrf-token');
                cookieStore.delete('next-auth.session-token');
                cookieStore.delete('__next_hmr_refresh_hash__');
                cookieStore.delete('host_url');
                cookieStore.delete('u_id');
                window.location.href = '/';
            }
            console.log(session);
            return session;
        },
        // async signOut({ token, session }) {
        //     console.log('here');
        // }
    }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };