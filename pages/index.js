import UsernameForm from '../components/UsernameForm';
import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import Loading from '@/components/Loading';
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';
import Modal from '../components/Modal'
import {useDaysLeftStore} from '../stores/useDaysLeftStore'
import PostForm from '@/components/PostForm';

export default function Home({drillUp}) {
    const {data:session} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const [idsLikedByUser, setIdsLikedByUser] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const daysLeft = useDaysLeftStore((state) => state.days);
    const router = useRouter();

    async function fetchHomePosts() {
      await axios.get('/api/posts').then(response => {
        setPosts(response.data.posts);
        setIdsLikedByUser(response.data.idsLikedByUser);
      })
    }

    // async function triggerDumpster() {
    //   await axios.delete('/api/dumps').then(response => {
    //     const timestampLastDump = response.data.createdAt;
    //     const deadline = new Date(timestampLastDump);
    //     deadline.setDate(deadline.getDate() + 14);
    //     const today = new Date();
    //     const deadlineTime = deadline.getTime();
    //     const todayTime = today.getTime();
    //     const difference = deadlineTime - todayTime;
    //     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    //     setModalVisible(true);
    //     setDaysLeft(14);
    //   })
    // }

    useEffect(() => {
      if(daysLeft > 0) {
        return
      }
      setModalVisible(true)
    }, [daysLeft]);

    useEffect(() => {
      if(!session) {
        return
      }
      fetchHomePosts();
    }, [session, modalVisible]);

    useEffect(() => {
      if(!userInfo) {
        return
      }
      drillUp(userInfo.userColor, userInfo.username)
    }, [userInfo])

    if (userInfoStatus === 'loading') {
      return <Layout><Loading/></Layout>;
    }

    if (userInfo && !userInfo?.username) {
      return <Layout><UsernameForm /></Layout>;
    }

    if (!userInfo) {
      router.push('/login');
      return <Layout><Loading/></Layout>
    }

    return (
      <Layout>
        {modalVisible && (
          <Modal onClose={() => setModalVisible(false)} content="All the garbage is gone." garbage/>
        )}
        <div className='pt-8 sm:pt-10'>
          <PostForm onPost={() => {fetchHomePosts()}}/>
          <div className="mt-6 ml-4 mr-4">
            {posts.length > 0 && posts.map(post => (
              <div key={post._id}>
                {post.parent && (
                  <div className="relative flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                    <div className="bg-litterLightGray absolute inset-0 rounded-lg opacity-40 pointer-events-none"></div>
                    <PostContent {...post.parent}/>
                    <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterBorder relative bg-litterWhite">
                      <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
                    </div>
                  </div>
                )}
                {!post.parent && (
                  <div className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder bg-litterWhite">
                    <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)} single />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }