import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { CurrentBranchState } from "../../atoms/branchAtom";
import { modalState } from "../../atoms/modalAtom";
import { handleBranchState } from "../../atoms/branchAtom";
import { handlePostState } from "../../atoms/postAtom";
import { selectedTreeState } from "../../atoms/treeAtom";
import { CopyBlock, dracula } from "react-code-blocks";
import { Accordion, AccordionDetails, AccordionSummary, Input, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AddBranchForm() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handleBranch, setHandleBranch] = useRecoilState(handleBranchState);
  const [currentBranch, setCurrentBranch] = useRecoilState(CurrentBranchState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  const uploadBranch = async (e) => {
    e.preventDefault();

    await fetch("/api/branch", {
      method: "POST",
      body: JSON.stringify({
        name: input,
        treeID: currentTree,
        parentID: currentBranch._id,
        imageBranch: photoUrl,
        description: description,
        code: code,
        url: url
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setHandleBranch(true);
    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <input
        type="text"
        placeholder="Название ветки"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Описание"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        rows="4"
        placeholder="Code here"
        className="bg-transparent focus:outline-none dark:placeholder-white/75"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Url"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Code</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CopyBlock
            text={code}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </AccordionDetails>
      </Accordion>

      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
      <button
        className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
        type="submit"
        onClick={uploadBranch}
        disabled={!input.trim() && !photoUrl.trim()}
      >
        Добавить
      </button>
    </form>
  );
}

export default AddBranchForm;
