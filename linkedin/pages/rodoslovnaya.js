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

const orgChart = {
  id: '0',
  name: 'CEO',
  children: [
    {
      id: '1',
      name: 'Manager',
      children: [
        {
          id: '2',
          name: 'Foreman',
          children: [
            {
              id: '3',
              name: 'Worker',
            },
          ],
        },
        {
          id: '4',
          name: 'Foreman',
          children: [
            {
              id: '5',
              name: 'Worker',
            },
          ],
        },
      ],
    },
  ],
};

export default function Rodoslovnaya({ posts, articles, rodos }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);


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
        </div>
        <div className="w-px ">
        <OrgChartTree data={orgChart} />
        </div>
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
