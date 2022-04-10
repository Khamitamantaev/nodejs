import { Button } from '@mui/material';
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

const UserTrees = ({data, handleAddClick}) => {
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
          <h4 onClick={handleAddClick} className="leading-4 text-xs">
            Добавить дерево 
          </h4>
        </div>

        <div className="sidebarButton flex items-center space-x-1.5">
          <BookmarkOutlinedIcon className="!-ml-1" />
          <h4 className="dark:text-white font-medium">My trees</h4>
        </div>
      </div>
    </div>
    {/* Bottom */}
    <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none">
    {!useSSRTrees ? <div className="">
        {trees && trees.length ? (
        <ul>
          {trees.map(tree => (
             <li key={tree._id} className="text-center"><p  onClick={() => handleTreeNameClick(tree._id)} className="sidebarLink">{tree.name}</p><button onClick={() => handleTreeClick(tree._id)}>Delete</button></li> 
          ))}
        </ul>) : <p className="sidebarLink">Groups</p>}
      </div> : <div className=''>
        {data && data.length ? (
        <ul>
          {data.map(tree => (
           <li key={tree._id} className="text-center"><p  onClick={() => handleTreeNameClick(tree._id)} className="sidebarLink">{tree.name}</p><button onClick={() => handleTreeClick(tree._id)}>Delete</button></li>
          ))} 
        </ul>) : <p className="sidebarLink">Groups</p>}
      </div>}
      <div className="sidebarButton text-center">
        <h4 className="dark:text-white font-medium text-sm">Discover More</h4>
      </div>
    </div>
  </div>
  )
}

export default UserTrees


