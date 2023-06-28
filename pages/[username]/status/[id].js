import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import PostContent from "../../../components/PostContent";
import PostForm from "@/components/PostForm";
import Layout from "../../../components/Layout";
import Link from "next/link";
import useUserInfo from "@/hooks/useUserInfo";
import TopNavigationLink from "@/components/TopNavigationLink";

export default function PostPage() {
    const router = useRouter();
    const {id} = router.query;
    const [post, setPost] = useState();
    const [replies, setReplies] = useState([]);
    const [repliesLikedByUser, setRepliesLikedByUser] = useState([]);
    const {userInfo} = useUserInfo();

    function fetchData() {
        axios.get('/api/posts?id='+id)
            .then(response => {
                setPost(response.data)
            })
        axios.get('/api/posts?parent='+id)
            .then(response => {
                setReplies(response.data.posts);
                setRepliesLikedByUser(response.data.idsLikedByUser);
            })
    }

    useEffect(() => {
        if(!id) {
            return;
        }
        fetchData();
    }, [id]);

    console.log({post});

    return (
        <Layout>
            <TopNavigationLink navTitle={post?.author?.username}/>
            <div className="flex flex-col mb-6 ml-4 mr-4">
                {!!post?._id && (
                    <div className="flex flex-col mb-4 rounded-lg py-2 px-3 border border-litterBorder">
                        <PostContent {...post} big/>
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
                        <div key={reply._id} className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                            <PostContent {...reply} likedByUser={repliesLikedByUser.includes(reply._id)}/>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}