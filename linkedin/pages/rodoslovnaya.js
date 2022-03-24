import { AnimatePresence } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { connectToDatabase } from "../util/mongodb";

export default function Rodoslovnaya({ posts, articles }) {
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
                <title>Feed | LinkedIn</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <main className="flex justify-start gap-x-5 px-4 sm:px-12">
                <div className="w-60 ">
                    01
                </div>
                <div className="w-px ">
                    02
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