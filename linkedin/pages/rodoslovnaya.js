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
import { handleTreeState, searchTreeState, selectedTreeState, userTree, userTreeList, useSSRTreesState } from "../atoms/treeAtom";
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


export default function Rodoslovnaya({ data, userData }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState);
  const user_trees = useRecoilStateLoadable(userTreeList);
  const [tree, setTree] = useState(initialState)
  const [searchTree, setSearchTree] = useRecoilState(searchTreeState)
  const [handleBranch, setHandleBranch] = useRecoilState(handleBranchState);
  const [handleTree, setHandleTree] = useRecoilState(handleTreeState);

  const { data: session } = useSession()
  // const [trees, setTrees] = useRecoilState(userTreeList)
  useEffect(async () => {
    // console.log(session.user.email)
    if (currentTree) {
      const fetchTree = async () => {
        const response = await fetch(`/api/tree/${currentTree}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const responseData = await response.json();
        const nest = (items, _id = null, link = 'parentID') =>
          items.filter(item => item[link] === _id)
            .map(item => ({
              ...item,
              search: genericSearch(item.name),
              children: nest(items, item._id)
            }))
        if (responseData.tree) {
          const json = nest(responseData.tree.branches)
          console.log(json)
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

  const genericSearch = (element) => {
    if(searchTree.includes(element.toString())) {
      return true
    }
    return false
  }

  // async function genericSearch(element){
  //   if(element.name === searchTree){
  //     return 'true'
  //   } else {
  //     return 'false'
  //   } 
  // }
  

  // function searchTreew(element, matchName) {
  //   console.log(element)
  //   console.log(matchName)
  //   let arr = []
  //   if(element && element.name === matchName) {
  //     arr.push(element)
  //     return arr
  //   }
  //   if(element && element.children) {
  //     element.children.filter(element => element.name === matchName).forEach(element => {
  //         arr.push(searchTreew(element, matchName))
  //     });
  //     return arr
  //   }
  //   // if(element && element.name === matchName) {
  //   //   arr.push(element)
  //   //   return element
  //   // }
  //   // else if(element && element.children !== null) {
  //   //   var i;
  //   //   var result = null;
  //   //   for(i=0; result === null && i< element.children.length; i++) {
  //   //     result = searchTreew(element.children[i], matchName)
  //   //     arr.push(result)
  //   //   }
  //   //   return arr
  //   // }
  //   // else if (element && element.children !== null) {
  //   //   var i;
  //   //   var result = null;
  //   //   for (i = 0; result === null && i < element.children.length; i++) {
  //   //     result = searchTreew(element.children[i], matchName);
  //   //     arr.push(result)
  //   //   }
  //   //   return arr

  //   // }
  //   return null
  // }



  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | Khammerson</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12 ml-14">
        <div className="flex flex-col md:flex-row gap-5 ">
          <UserTrees data={data} handleAddClick={handleAddClick} />
        </div>
        {/* {session.user.email === 'khamitamantaev@gmail.com' ? <OrgChartTree data={tree} userId={userData}/> : <>В разработке</> } */}
        <OrgChartTree data={tree} userId={userData} />
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
  const user = await db.collection("users").findOne({ email: session.user.email })
  const trees = await db
    .collection("trees")
    .find({ rootUser: user._id })
    .sort({ timestamp: -1 })
    .toArray()
  return {
    props: {
      session,
      data: trees.map((tree) => ({
        _id: tree._id.toString(),
        name: tree.name
      })),
      userData: user._id.toString()
    },
  };
}
