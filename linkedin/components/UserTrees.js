import { Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';
import { handleTreeState, selectedTreeState, userTreeList, useSSRTreesState } from '../atoms/treeAtom';
import TreeItem from './TreeItem';
import { Avatar } from "@mui/material";
import Image from "next/image";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { signOut, useSession } from "next-auth/react";
import DeleteIcon from '@mui/icons-material/Delete';
const UserTrees = ({ data, handleAddClick }) => {
  const [disableTreeBut, setDisableTreeBut] = useState(false)
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const [trees, setTrees] = useRecoilState(userTreeList)
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [useSSRTrees, setUseSSRTrees] = useRecoilState(useSSRTreesState)
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTrees = async () => {
      const response = await fetch("/api/tree", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const responseData = await response.json();
      setTrees(responseData.trees)
      if (trees.length > 3) {
        setDisableTreeBut(true)
      }
      else setDisableTreeBut(false)
    };
    fetchTrees();
  }, [handleTree, useSSRTrees])

  const handleTreeNameClick = (id) => {
    setCurrentTree(id)
    setUseSSRTrees(false)
  }

  const handleTreeClick = (id) => {
    setCurrentTree(id)
    setModalOpen(true);
    setModalType("deleteTree");
  }

  return (
    <div className="space-y-2 min-w-max max-w-lg">
      {/* Top */}
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none w-60">
        <div className="relative w-full h-14">
          <Image src="https://rb.gy/i26zak" layout="fill" priority />
        </div>
        <Avatar
          // onClick={signOut}
          src={session?.user?.image}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-purple-700 underline-offset-1 cursor-pointer">
            {session?.user?.name}
          </h4>
          <p className="text-black/60 dark:text-white/75 text-sm">
            {session?.user?.email}
          </p>
        </div>

        <div className="hidden md:inline text-left dark:text-white/75 text-sm">

          <div className="sidebarButton">
            <Button onClick={handleAddClick} disabled={disableTreeBut} className="leading-2 text-xs">
              Добавить
            </Button>
          </div>

          {/* <div className="sidebarButton flex items-center space-x-1.5">
          <BookmarkOutlinedIcon className="!-ml-1" />
          <h4 className="dark:text-white font-medium">My trees</h4>
        </div> */}
        </div>
      </div>
      {/* Bottom */}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
        {!useSSRTrees ? <div className="">
          {trees && trees.length ? (
            <ul>
              {trees.map(tree => (
                <li key={tree._id} className="flex flex-row p-2">
                  <Grid container sx={{ color: 'text.primary' }}>
                    <Grid item xs={4}>
                      <Typography>{tree.isPrivate === true ? 'Приватное' : 'Публичное'}</Typography>
                    </Grid>
                  </Grid>
                  <p onClick={() => handleTreeNameClick(tree._id)} className="sidebarLink">{tree.name}</p>
                  <div className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path onClick={() => handleTreeClick(tree._id)} stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>

                </li>
              ))}
            </ul>) : <p className="sidebarLink">Groups</p>}
        </div> : <div className=''>
          {data && data.length ? (
            <ul>
              {data.map(tree => (
                <li key={tree._id} className="">
                  <Grid container sx={{ color: 'text.primary' }}>
                    <Grid item xs={4}>
                      <Typography>Filled</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <DeleteIcon />
                    </Grid>
                  </Grid>
                  <p className="basis-1/2 sidebarLink" onClick={() => handleTreeNameClick(tree._id)}>{tree.name}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path onClick={() => handleTreeClick(tree._id)} stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </li>
              ))}
            </ul>) : <p className="sidebarLink">Groups</p>}
        </div>}
        <div className="sidebarButton text-center">
          <h4 className="dark:text-white font-medium text-sm">Узнать больше</h4>
        </div>
      </div>
    </div>
  )
}

export default UserTrees


