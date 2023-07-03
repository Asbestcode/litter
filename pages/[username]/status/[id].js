import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../../components/PostContent";
import PostForm from "@/components/PostForm";
import Layout from "../../../components/Layout";
import useUserInfo from "@/hooks/useUserInfo";
import TopNavigationLink from "@/components/TopNavigationLink";

export default function PostPage() {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();
    // const [postLikedByUser, setPostLikedByUser] = useState();
    const [replies, setReplies] = useState([]);
    // const [repliesLikedByUser, setRepliesLikedByUser] = useState([]);
    const {userInfo} = useUserInfo();

    function fetchData() {
        axios.get('/api/posts?id='+id)
            .then(response => {
                setPost(response.data.post);
                // setPostLikedByUser(response.data.idLikedByUser)
            })
        axios.get('/api/posts?parent='+id)
            .then(response => {
                setReplies(response.data.posts);
                // setRepliesLikedByUser(response.data.idsLikedByUser);
            })
    }

    useEffect(() => {
        if(!id) {
            return;
        }
        fetchData();
    }, [id]);

    return (
        <Layout>
            <TopNavigationLink/>
            <div className="flex flex-col mb-6">
                {!!post?._id && (
                    <div className="flex flex-col mx-4 mb-4 rounded-lg py-2 px-3 border border-litterBorder">
                        {post.parent && (
                            <div>
                                <PostContent {...post.parent} />
                                {/* likedByUser={repliesLikedByUser.includes(reply._id)} */}
                                <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterLightGray relative">
                                    <PostContent {...post} big />
                                    {/* likedByUser={postLikedByUser} */}
                                </div>
                            </div>
                        )}
                        {!post.parent && (
                          <PostContent {...post} big/>
                        //   likedByUser={postLikedByUser}
                        )}
                    </div>
                )}
                {!!userInfo && (
                    <div className="mb-8">
                        <PostForm 
                            onPost={fetchData}
                            parent={id}
                            compact
                        />
                    </div>
                )}
                <div className="">
                    {replies.length > 0 && replies.map(reply => (
                        <div key={reply._id} className="flex flex-col mb-6 mx-4 rounded-lg py-2 px-3 border border-litterBorder">
                            <PostContent {...reply} />
                            {/* likedByUser={repliesLikedByUser.includes(reply._id)} */}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}