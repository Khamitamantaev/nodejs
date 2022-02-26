import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { wrapper } from "../redux/store"
import { loadUser } from "../redux/user/userAction"

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <h1>Home</h1>
        {/* Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    )
  }
  return (
    <>
      <h1>Home</h1>
      {/* Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button> */}
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })
      const cookies = parseCookies()

      // if (cookies.user) {
      //   cookies.user.token = cookies?.token
      // }

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : JSON.parse(req.cookies.user)

      store.dispatch(loadUser(user.email, user))

      return {
        props: {
          session,
        },
      }
    }
)
