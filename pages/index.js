import UsernameForm from '../components/UsernameForm';
import TopNavigationLink from '@/components/TopNavigationLink';
import UserIcon from '../components/UserIcon';
import {signOut, useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import PostForm from '../components/PostForm';
import axios from 'axios';
import {useRouter} from "next/router";
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';
import useRandomElement from '@/hooks/useRandomElement';

export default function Home() {

    const {data:session} = useSession();
    const {userInfo, setUserInfo, status:userInfoStatus} = useUserInfo();
    const {randomElement} = useRandomElement();
    const [posts, setPosts] = useState([]);
    const [idsLikedByUser, setIdsLikedByUser] = useState([])
    // const [randomElement, setRandomElement] = useState();
    const router = useRouter();
    
    async function fetchHomePosts() {
      await axios.get('/api/posts').then(response => {
        setPosts(response.data.posts)
        setIdsLikedByUser(response.data.idsLikedByUser)
      })
    }

    // function createRandomElement (data) {
    //   return (
    //     <div style={{width:`${data.image.width}px`, height:`${data.image.height}px`, backgroundImage:`url(${data.image.url})`}}>
    //       <p>{data.joke}</p>
    //       <p>{data.weather}</p>
    //     </div>
    //   );
    // }

    // async function fetchRandomData() {
    //   await axios.get('api/random').then(response => {
    //     setRandomElement(createRandomElement(response.data));
    //   })
    // }
    // const yalla = fetchRandomData()

    async function logOut() {
      setUserInfo(null);
      await signOut();
    }

    useEffect(() => {
      if(!session) {
        return
      }
        // fetchRandomData();
        fetchHomePosts();
    }, [session]);

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
        <div className="">
            <TopNavigationLink navTitle={userInfo.username}/>
        </div>
        <PostForm onPost={() => {fetchHomePosts()}}/>
        <div className="mt-6 ml-4 mr-4">
          <div>{randomElement}</div>
          {/* {randomElement && (
            <div dangerouslySetInnerHTML={{__html: randomElement}}></div>
          )} */}
          {posts.length > 0 && posts.map(post => (
            <div key={post._id} className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
              {post.parent && (
                <div>
                  <PostContent {...post.parent} />
                  <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterLightGray relative">
                    <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
                  </div>
                </div>
              )}
              {!post.parent && (
                <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
              )}
            </div>
          ))}
        </div>
        {userInfo && (
          <div className="ml-4">
            <button onClick={logOut} className='bg-white border border-black text-black px-5 py-2 rounded-full'>Logout</button>
          </div>
        )}
      </Layout>
    )
  }