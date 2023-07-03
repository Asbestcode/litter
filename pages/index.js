import UsernameForm from '../components/UsernameForm';
import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import PostContent from '../components/PostContent';
import Layout from '../components/Layout';
import Modal from '../components/Modal'
import {useDaysLeftStore} from '../stores/useDaysLeftStore'

export default function Home() {
    const {data:session} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const [posts, setPosts] = useState([]);
    const [idsLikedByUser, setIdsLikedByUser] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const setDaysLeft = useDaysLeftStore((state) => state.setDaysLeft);
    const router = useRouter();
    
    function getDaysLeft(timestampLastDump) {
      const deadline = new Date(timestampLastDump)
      deadline.setDate(deadline.getDate() + 14)
      const today = new Date();
      const deadlineTime = deadline.getTime();
      const todayTime = today.getTime();
      const difference = deadlineTime - todayTime;
      const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
      setDaysLeft(daysLeft);
    }
  
    async function checkDumps() {
      await axios.delete('/api/dumps').then(response => {
        setModalVisible(response.data.modal);
        getDaysLeft(response.data.dump[0].createdAt)
      })
    }

    async function fetchHomePosts() {
      await axios.get('/api/posts').then(response => {
        setPosts(response.data.posts)
        setIdsLikedByUser(response.data.idsLikedByUser)
      })
    }

    useEffect(() => {
      if(!session) {
        return
      }
      fetchHomePosts();
      checkDumps();
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
        {modalVisible && (
          <Modal onClose={() => setModalVisible(false)}/>
        )}
        <div className='pt-1'>
          <div className="mt-6 ml-4 mr-4">
            <h1 className='font-bold text-2xl mb-8'>Check out that garbage</h1>
            {posts.length > 0 && posts.map(post => (
              <div key={post._id} className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterLightGray">
                {post.parent && (
                  <div>
                    <PostContent {...post.parent} />
                    <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterLightGray relative">
                      <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
                    </div>
                  </div>
                )}
                {!post.parent && (
                  <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)} />
                )}
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }



{/* {post.parent && (
  <div>
    <PostContent {...post.parent} likedByUser={idsLikedByUser.includes(post._id)}/>
    <div className="flex flex-col my-3 rounded-lg py-2 px-3 border border-litterLightGray relative">
      <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
    </div>
  </div>
)}
{!post.parent && (
  <PostContent {...post} likedByUser={idsLikedByUser.includes(post._id)}/>
)} */}