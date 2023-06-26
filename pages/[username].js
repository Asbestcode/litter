import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import TopNavigationLink from "@/components/TopNavigationLink";
import CoverPicture from "@/components/CoverPicture";
import UserIcon from "@/components/UserIcon";
import PostContent from "@/components/PostContent";

export default function UserPage() {
    const router = useRouter();
    const {username} = router.query;
    const [profileInfo, setProfileInfo] = useState();
    const [posts, setPosts] = useState([]);
    const [postsLikedByUser, setPostsLikedByUser] = useState([]);

    useEffect(() => {
        if(!username){
            return
        }
        axios.get('/api/users?username='+username)
            .then(response => {
                setProfileInfo(response.data.user);
            })
    }, [username]);

    useEffect(() => {
        if(!profileInfo?._id){
            return
        }
        axios.get('/api/posts?author='+profileInfo._id)
            .then(response => {
                setPosts(response.data.posts);
                setPostsLikedByUser(response.data.idsLikedByUser)
            })
    }, [profileInfo])

    return (
        <Layout>
            {!!profileInfo && (
                <div>
                    <div className="">
                        <TopNavigationLink navTitle={profileInfo.username}/>
                    </div>
                    <CoverPicture src={profileInfo.cover}/>
                    <div className="flex justify-between mb-14">
                        <div className="relative ml-5">
                            <div className="flex items-end absolute -top-14">
                                <UserIcon color={profileInfo.userColor}/>
                                <h1 className="text-2xl font-bold p-2 pb-8">{profileInfo.username}</h1>
                            </div>
                        </div>
                        <button className="mt-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                            Follow
                        </button>
                    </div>
                    <div>
                        {posts?.length > 0 && posts.map(post => 
                            <div key={post._id} className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                                <PostContent {...post} likedByUser={postsLikedByUser.includes(post._id)}/>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    )
}