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
import UserTrees from "../components/UserTrees";
import { useEffect, useState } from "react";
import { handleTreeState, selectedTreeState, userTree, userTreeList, useSSRTreesState } from "../atoms/treeAtom";
import { handleBranchState } from "../atoms/branchAtom";

const initialState = {
  name: "Пример",
  children: [
    {
      name: "Пример",
      children: [
        {
          name: "Пример",
          children: []
        },
        {
          name: "Пример",
          children: []
        }
      ]
    },

    {
      name: "Пример",
      children: []
    },

  ]
}


export default function Rodoslovnaya({ data, articles, rodos }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const user_trees = useRecoilStateLoadable(userTreeList);
  const [tree, setTree] = useState(initialState)
  const [handleBranch, setHandleBranch] = useRecoilState(handleBranchState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);
  // const [trees, setTrees] = useRecoilState(userTreeList)
  useEffect(async () => {
   
    if (currentTree) {
      const fetchTree = async () => {
        const response = await fetch(`/api/tree/${currentTree}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const responseData = await response.json();
        const nest = (items, _id = null, link = 'parentID') => items.filter(item => item[link] === _id).map(item => ({
          ...item,
          children: nest(items, item._id)
        }))
        if (responseData.tree) {
          const json = nest(responseData.tree.branches)
          setTree(json)

        } else {
          setTree(initialState)
        }
        setHandleBranch(false)
        setHandleTree(false)
      };
      fetchTree();
    }
  }, [currentTree, handleBranch, handleTree])


  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  const handleAddClick = () => {
    setModalOpen(true);
    setModalType("addTree");
  }



  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | Khammerson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex justify-start gap-x-5 px-4 sm:px-12">

        <div className="w-60 text-center border-2">
          <Button className="hover:bg-green-500 mr-4" onClick={handleAddClick}>Добавить дерево</Button>
          <UserTrees data={data}/>
        </div>
        <div className="w-px">
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

  const { db } = await connectToDatabase();
  const user = await db.collection("users").findOne({ email: session.user.email})
  const trees = await db
    .collection("trees")
    .find({ rootUser: user._id})
    .sort({ timestamp: -1 })
    .toArray()

  return {
    props: {
      session,
      data: trees.map((tree) => ({
        _id: tree._id.toString(),
        name: tree.name
      })),
    },
  };
}
