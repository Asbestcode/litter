import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import CoverPicture from "@/components/CoverPicture";
import UserIcon from "@/components/UserIcon";
import PostContent from "@/components/PostContent";
import useUserInfo from "@/hooks/useUserInfo";
import Modal from "@/components/Modal"
import { useUserColorStore } from "@/stores/useUserColorStore";

export default function UserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {username} = router.query;
  const [profileInfo, setProfileInfo] = useState();
  const [originalProfileInfo, setOriginalProfileInfo] = useState();
  const {userInfo} = useUserInfo();
  const [posts, setPosts] = useState([]);
  const [postsLikedByUser, setPostsLikedByUser] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [postCount, setPostCount] = useState();
  const [warning, setWarning] = useState(false);
  const setUserName = useUserColorStore((state) => state.setUserName);

  async function fetchHomePosts() {
    axios.get('/api/posts?author='+profileInfo._id)
      .then(response => {
        setPosts(response.data.posts);
        setPostsLikedByUser(response.data.idsLikedByUser);
        setLoading(false);
    })
  }

  useEffect(() => {
      if (!username) {
        return;
      }
      axios.get('/api/users?username='+username)
        .then(response => {
          setProfileInfo(response.data.user);
          setOriginalProfileInfo(response.data.user);
          setPostCount(response.data.user.postCount)
          setIsFollowing(!!response.data.follow);
        })
  }, [username]);

  useEffect(() => {
      if(!profileInfo?._id){
          return
      };
      fetchHomePosts();
  }, [profileInfo])

  function updateUserImage(type, src) {
      setProfileInfo(prev => ({...prev,[type]:src}));
  }

  async function updateProfile() {
      const {username} = profileInfo;
      if (username === originalProfileInfo.username) {
        setEditMode(false);
        return
      };
      await axios.put('/api/profile', {
          username
      }).then(response => {
        if (response.data === "taken"){
          setWarning(true);
          setProfileInfo(prev => {
            const {username} = originalProfileInfo;
            return {...prev, username}
          });
          setUserName(username);
          setEditMode(false);
        } else {
          setProfileInfo(prev => ({...prev, username: username}));
          setUserName(username);
          setEditMode(false)
        }
      })
  }

  function toggleFollow() {
      setIsFollowing(prev => !prev);
      axios.post('/api/followers', {
        destination: profileInfo?._id,
      })
  }
  
  const isUserProfile = profileInfo?._id === userInfo?._id

  return (
    <Layout>
      {loading ? (<Loading/>) : (
        <div>
          {warning && (
            <Modal onClose={() => setWarning(false)} content="This username is already taken" alreadyTaken/>
          )}
          {!!profileInfo && (
            <div className="relative">
              <CoverPicture
                editable={isUserProfile} 
                src={profileInfo.cover} 
                onChange={src => updateUserImage('cover',src)}
              />
              <div className="absolute -mt-10 sm:-mt-14 px-4 flex justify-between w-full z-20">
                <div className="flex items-center gap-1">
                  <div className="h-28 sm:h-36 flex ml-2">
                    <UserIcon color={profileInfo.userColor}/>
                  </div>
                  <div className="mt-12 sm:mt-16 pt-1 sm:pt-4">
                    {!editMode && (<>
                      <h1 className="text-xl sm:text-2xl font-bold">{profileInfo.username}</h1>
                      <p className="text-litterLightGray">{postCount} Posts</p>
                    </>)}
                    {editMode && (
                      <input type="text" 
                      value={profileInfo.username}
                      onChange={event => setProfileInfo(prev => ({...prev, username: event.target.value }))}
                      maxLength="10"
                      minLength="2"
                      className="bg-litterBorder text-white px-4 py-1 sm:px-5 sm:py-2 border border-litterBorder rounded-full w-36 mt-1 sm:mb-1"/>
                    )}
                  </div>
                </div>
                <div className="mt-16 sm:mt-20 pt-1 sm:pt-2 mr-2">
                  {isUserProfile && (<>
                    {!editMode && (
                      <button onClick={() => setEditMode(true)} className="bg-white px-4 py-1 sm:px-5 sm:py-2 text-litterBorder border border-litterBorder rounded-full">
                        Edit
                      </button>
                    )}
                    {editMode && (    
                      <button onClick={() => updateProfile()} className="bg-litterDarkGray px-4 py-1 sm:px-5 sm:py-2 text-white border border-litterBorder rounded-full">
                        Done
                      </button>
                    )}
                  </>)}
                  {!isUserProfile && (
                    <button onClick={toggleFollow} 
                      className={(isFollowing ? 'bg-litterWhite text-litterDarkGray' : 'bg-litterDarkGray text-white')+' px-4 py-1 sm:px-5 sm:py-2 rounded-full border border-litterBorder'}>
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  )}
                </div>
              </div>
              <div className="ml-4 mr-4 mt-24 sm:mt-28">
                {posts?.length > 0 && posts.map(post => 
                  <div key={post._id}>
                    {post.parent && (
                      <div className="relative flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                        <div className="bg-litterLightGray absolute inset-0 rounded-lg opacity-30 pointer-events-none"></div>
                        <PostContent {...post.parent} isUserPage/>
                        <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterLightGray relative bg-litterWhite">
                          <PostContent {...post} likedByUser={postsLikedByUser.includes(post._id)} isUserPage/>
                        </div>
                      </div>
                    )}
                    {!post.parent && (
                      <div className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                        <PostContent {...post} likedByUser={postsLikedByUser.includes(post._id)} isUserPage single/>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>)
      }
    </Layout>
  )
}