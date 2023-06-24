import UsernameForm from '../components/UsernameForm';
import UserIcon from '../components/UserIcon';
import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import PostForm from '../components/PostForm';
import axios from 'axios';
import {useRouter} from "next/router";
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';

export default function Home() {
    const {data:session} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const [idsLikedByUser, setIdsLikedByUser] = useState([])
    const router = useRouter();
    
    function fetchHomePosts() {
      axios.get('/api/posts').then(response => {
        setPosts(response.data.posts)
        setIdsLikedByUser(response.data.idsLikedByUser)
      })
    }

    useEffect(() => {
      fetchHomePosts()
    }, []);

    if (userInfoStatus === 'loading') {
      return 'loading user info';
    }

    if (!userInfo) {
      router.push('/login');
      return 'loading user info';
    }

    if (!userInfo?.username) {
      return <UsernameForm />;
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
        <div className=''>
          <button className='bg-white border border-black text-black px-5 py-2 rounded-full'>Logout</button>
        </div>
      </Layout>
    )
  }