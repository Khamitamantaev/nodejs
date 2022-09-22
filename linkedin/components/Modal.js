import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useSession } from "next-auth/react";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Typography } from "@mui/material";
import Form from "./Form";
import { useRecoilState, useRecoilValue } from "recoil";
import { getPostState } from "../atoms/postAtom";
import Post from "./Post";
import AddBranchForm from "./Form/addBranchForm";
import DeleteBranch from "./Form/deleteBranch";
import AddTreeForm from "./Form/AddTreeForm";
import DeleteTree from "./Form/deleteTree";
import { CurrentBranchState } from "../atoms/branchAtom";
import { CopyBlock, dracula } from "react-code-blocks";
import { sample } from "./codeblock";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddTreeUserForm from "./Form/addTreeUserForm";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const editBranch = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "24vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const addBranch = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "24vh",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const deleteBranch = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const addTree = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const deleteTree = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};


const Modal = ({ handleClose, type }) => {
  const { data: session } = useSession();
  const post = useRecoilValue(getPostState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const codeString = '(num) => num + 1';
  const [languageDemo, changeDemo] = useState(sample["jsx"]);
  const [language, changeLanguage] = useState("jsx");
  const [lineNumbers, toggleLineNumbers] = useState(true);
  return (
    <Backdrop onClick={handleClose}>
      {type === "dropIn" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Добавить</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar src={session?.user?.image} className="!h-11 !w-11" />
              <h6>{session?.user?.name}</h6>
            </div>
            <Form />
          </div>
        </motion.div>
      )}

      {type === "editBranch" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-2/3 md:-mt-96 mx-6"
          variants={editBranch}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Текущая ветка</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>
          <div className="p-4 flex items-center">
            
            {currentBranch.imageBranch ? <div className="p-4"><img className="" width={222} height={222} src={currentBranch.imageBranch} /></div> : <div className="p-4"><img className="" width={222} height={222} src='/tree/tree.jpg' /></div>}
          </div>
          {currentBranch.name ? <h2 className="text-xl p-6">{currentBranch.name}</h2> : ""}
          <div className="p-4">
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Описание</Typography>

              </AccordionSummary>
              <AccordionDetails>
                <div className="mt-4">
                  {currentBranch.description ? <textarea
                    value={currentBranch.description}
                    disabled={true}
                    className="
                      form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                     "
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Описание"
                  ></textarea> : <>Нет отписания</>}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Код</Typography>

              </AccordionSummary>
              <AccordionDetails>
                <div className="mt-4">
                  {currentBranch.code ? <CopyBlock
                    language={language}
                    text={currentBranch.code}
                    showLineNumbers={lineNumbers}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                  /> : <CopyBlock
                    text={"No Code"}
                    theme={dracula}
                    wrapLines={true}
                    codeBlock
                  />}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Ссылка</Typography>

              </AccordionSummary>
              <AccordionDetails>
                <div className="mt-4">
                  {currentBranch.url ? <a>{currentBranch.url}</a> : <>No url</>}
                </div>
              </AccordionDetails>
            </Accordion>


          </div>

          {/* <div className="p-4 space-y-2">
            {currentBranch.imageBranch ? <img className="w-full cursor-pointer" ></img> : <div>Без картинки</div>}
          </div> */}
        </motion.div>
      )}

      {type === "addBranch" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
          variants={addBranch}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Добавить Ветку</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>

          <div className="p-4 space-y-2">
            <AddBranchForm />
          </div>
        </motion.div>
      )}

      {type === "deleteBranch" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
          variants={deleteBranch}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Удалить Ветку?</h4>
          </div>

          <div className="p-4 space-y-2">
            <DeleteBranch />
          </div>
        </motion.div>
      )}

      {type === "addTree" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
          variants={addTree}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Добавить дерево</h4>
          </div>

          <div className="p-4 space-y-2">
            {session?.user?.email === 'khamitamantaev@gmail.com' ? 
            <AddTreeForm /> : <AddTreeUserForm/>
          }
            
          </div>
        </motion.div>
      )}

      {type === "deleteTree" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] w-full max-w-lg md:-mt-96 mx-6"
          variants={deleteTree}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">Удалить дерево</h4>
          </div>

          <div className="p-4 space-y-2">
            <DeleteTree />
          </div>
        </motion.div>
      )}


      {type === "gifYouUp" && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="rounded-l-lg flex bg-[#1D2226] w-full max-w-6xl -mt-[7vh] mx-6"
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.img
            alt=""
            onDoubleClick={handleClose}
            src={post.photoUrl}
            className="object-contain max-h-[80vh] w-full max-w-3xl rounded-l-lg"
          />
          <div className="w-full md:w-3/5 bg-white dark:bg-[#1D2226] rounded-r-lg">
            <Post post={post} modalPost />
          </div>
        </motion.div>
      )}
    </Backdrop>
  );
};

export default Modal;
