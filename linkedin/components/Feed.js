import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Input from "./Input";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "./Post";
import { selectedTreeState } from "../atoms/treeAtom";

function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  const [currentTree, setCurrentTree] = useRecoilState(selectedTreeState)
  useEffect(() => {
    
    const fetchPosts = async () => {
      const response = await fetch("/api/public", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      setRealtimePosts(responseData.trees);
      setHandlePost(false);
      setUseSSRPosts(false);
    };

    fetchPosts();
  }, [handlePost]);

  

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      {/* <Input /> */}
      {/* Posts */}
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
}

export default Feed;
