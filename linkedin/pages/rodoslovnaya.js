import { AnimatePresence } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { connectToDatabase } from "../util/mongodb";
import Tree from 'react-d3-tree';
import OrgChartTree from "../components/Tree";
import { Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { AddForm } from "../components/Form/AddTreeForm";
import UserTrees from "../components/Form/UserTrees";
import { useEffect, useState } from "react";
import { selectedTreeState, userTree, userTreeList } from "../atoms/treeAtom";
import { handleBranchState } from "../atoms/branchAtom";

const initialState = {
  name: "Ваши возможности",
  children: [
    {
      name: "Создать дерево приватное",
      children: []
    },

    {
      name: "Создать дерево публичное",
      children: []
    },

  ]
}


export default function Rodoslovnaya({ posts, articles, rodos }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const user_trees = useRecoilStateLoadable(userTreeList);
  const [tree, setTree] = useState(initialState)
  const [handleBranch, setHandleBranch] = useRecoilState(handleBranchState);

  useEffect(async () => {
    if (currentTree) {
      const fetchTrees = async () => {
        const response = await fetch("/api/tree", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const responseData = await response.json();
        var result = responseData.trees.find(obj => obj._id === currentTree)
        const nest = (items, _id = null, link = 'parentID') => items.filter(item => item[link] === _id).map(item => ({
          ...item,
          children: nest(items, item._id)
        }))
        const json = nest(result.branches)
        if (result) {
          setTree(json)
        }
        setHandleBranch(false)
      };
      fetchTrees();
    }
  }, [currentTree, handleBranch])


  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });




  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | Khammerson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex justify-start gap-x-5 px-4 sm:px-12">
        <div className="w-60 ">
          <AddForm />
          <UserTrees />
        </div>
        <div className="w-px ">
          <OrgChartTree data={tree} />
        </div>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Check if the user is authenticated on the server...
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }

  // Get posts on SSR
  const { db } = await connectToDatabase();

  return {
    props: {
      session,
    },
  };
}
