import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import cookie from 'js-cookie'
import { useRouter } from 'next/router';
export default function ButtonAppBar() {
  const cookies = parseCookies()
  const { data: session } = useSession()
  const user = cookies?.user ? JSON.parse(cookies.user) : session?.user ? session?.user: ''
  const [userState, setUserState] = useState("")
  const router = useRouter()

  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)
  }, [router, setUserState])
  
  
  const logoutHandler = async () => {
    if(session) {
      signOut()
    }
    cookie.remove('token')
    cookie.remove('user')
    setUserState("")
}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            { userState && userState.email}
          </Typography>
          {userState ? (
              <>
                <Button color="inherit" onClick={logoutHandler}>Logout</Button>
              </>) : (
              <>
                <Link href={'/src/login'}>
                  <Button color="inherit">Login</Button>
                </Link>
                <Link href={'/src/register'}>
                  <Button color="inherit">Register</Button>
                </Link>
              </>)}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
