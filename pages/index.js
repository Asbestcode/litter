import UsernameForm from '../components/UsernameForm';
import UserIcon from '../components/UserIcon';
import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import PostForm from '../components/PostForm';
import axios from 'axios';
import {useRouter} from "next/router";
import PostContent from '../components/PostContent';

export default function Home() {
    const {data:session} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    
    function fetchHomePosts() {
      axios.get('/api/posts').then(response => {
        setPosts(response.data)
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
      <div className="max-w-lg mx-auto border-l border-r border-litterWhite min-h-screen p-4">
        <div className="flex flex-row items-center">
          <UserIcon color={userInfo.userColor}/>
          <h1 className="text-lg font-bold p-2">{userInfo.username}</h1>
        </div>
        <PostForm onPost={() => {fetchHomePosts()}}/>
        <div>
          {posts.length > 0 && posts.map(post => (
            <PostContent key={post._id} {...post}/>
          ))}
        </div>
      </div>
    )
  }