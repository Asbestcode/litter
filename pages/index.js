import UsernameForm from '../components/UsernameForm';
import UserIcon from '../components/UserIcon';
import {signOut, useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import PostForm from '../components/PostForm';
import axios from 'axios';
import {useRouter} from "next/router";
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';

export default function Home() {

    const {data:session} = useSession();
    const {userInfo, setUserInfo, status:userInfoStatus} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const [idsLikedByUser, setIdsLikedByUser] = useState([])
    const router = useRouter();
    
    function fetchHomePosts() {
      axios.get('/api/posts').then(response => {
        setPosts(response.data.posts)
        setIdsLikedByUser(response.data.idsLikedByUser)
      })
    }

    async function logOut() {
      setUserInfo(null);
      await signOut();
    }

    useEffect(() => {
      if(session) {
        fetchHomePosts();
      }
    }, []);

    if (userInfoStatus === 'loading') {
      return 'loading user info';
    }

    if (userInfo && !userInfo?.username) {
      return <UsernameForm />;
    }

    if (!userInfo) {
      router.push('/login');
      return 'no user info';
    }

    return (
      <Layout>
        <div className="flex flex-row items-center mb-4">
          <UserIcon color={userInfo.userColor}/>
          <h1 className="text-2xl font-bold p-2">{userInfo.username}</h1>
        </div>
        <PostForm onPost={() => {fetchHomePosts()}}/>
        <div className="mt-6">
          {posts.length > 0 && posts.map(post => (
            <PostContent key={post._id} {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
          ))}
        </div>
        {userInfo && (
          <div className=''>
            <button onClick={logOut} className='bg-white border border-black text-black px-5 py-2 rounded-full'>Logout</button>
          </div>
        )}
      </Layout>
    )
  }