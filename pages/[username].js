import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import TopNavigationLink from "@/components/TopNavigationLink";
import CoverPicture from "@/components/CoverPicture";
import UserIcon from "@/components/UserIcon";
import PostContent from "@/components/PostContent";
import useUserInfo from "@/hooks/useUserInfo";

export default function UserPage() {
    const router = useRouter();
    const {username} = router.query;
    const [profileInfo, setProfileInfo] = useState();
    const [originalProfileInfo, setOriginalProfileInfo] = useState();
    const {userInfo} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const [postsLikedByUser, setPostsLikedByUser] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if(!username){
            return
        }
        axios.get('/api/users?username='+username)
            .then(response => {
                setProfileInfo(response.data.user);
                setOriginalProfileInfo(response.data.user);
                setIsFollowing(!!response.data.follow);
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

    function updateUserImage(type, src) {
        setProfileInfo(prev => ({...prev,[type]:src}));
    }

    async function updateProfile() {
        const {username} = profileInfo;
        await axios.put('/api/profile', {
            username
        });
        setEditMode(false)
    }

    function cancelEdit() {
        setProfileInfo(prev => {
            const {username} = originalProfileInfo;
            return {...prev, username}
        });
        setEditMode(false)
    }

    async function toggleFollow() {
        setIsFollowing(prev => !prev);
        await axios.post('/api/followers', {
            destination: profileInfo?._id
        })
    }
    
    const isUserProfile = profileInfo?._id === userInfo?._id

    return (
        <Layout>
            {!!profileInfo && (
                <div>
                    <div className="">
                        <TopNavigationLink/>
                    </div>
                    <CoverPicture
                        editable={isUserProfile} 
                        src={profileInfo.cover} 
                        onChange={src => updateUserImage('cover',src)}
                    />
                    <div className="flex justify-between mb-14">
                        <div className="relative ml-4">
                            <div className="flex items-center absolute -top-14">
                                <UserIcon color={profileInfo.userColor}/>
                                {!editMode && (
                                    <h1 className="text-2xl font-bold mt-10">{profileInfo.username}</h1>
                                )}
                                {editMode && (
                                    <input type="text" value={profileInfo.username}
                                    onChange={event => setProfileInfo(prev => ({...prev, username: event.target.value }))}
                                    className="bg-litterBorder p-2 px-3 rounded-full text-white mt-12"/>
                                )}
                            </div>
                        </div>
                        <div>
                            {!isUserProfile && (
                                <button onClick={toggleFollow} 
                                    className={(isFollowing ? 'bg-litterLightGray' : 'bg-litterBlue')+' mt-4 mr-4 px-5 py-2 rounded-full text-white border border-litterBorder'}>
                                    {isFollowing ? 'Following' : 'Follow'}
                                </button>
                            )}
                            {isUserProfile && (
                                <div>
                                    {!editMode && (
                                        <button onClick={() => setEditMode(true)} className="mt-4 mr-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                                            Edit
                                        </button>
                                    )}
                                    {editMode && (
                                        <div>
                                            <button onClick={() => cancelEdit()} className="mt-4 mr-2 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                                                Cancel
                                            </button>      
                                            <button onClick={() => updateProfile()} className="mt-4 mr-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="ml-4 mr-4">
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