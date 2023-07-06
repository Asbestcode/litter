import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Loading from '@/components/Loading';
import UserIcon from '../components/UserIcon';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Explore() {
    const router = useRouter();
    const {data:session} = useSession();
    const [loading, setLoading] = useState(true);
    const {userInfo} = useUserInfo();
    const [followers, setFollowers] = useState([]);
    const [followersOfFollowers, setFollowersOfFollowers] = useState([]);
    const [restOfUsers, setRestOfUsers] = useState([]);
    const [usersOnFire, setUsersOnFire] = useState([]);

    function filterUsers(data) {
      const ownId = userInfo._id;
      const secondIdsClean = data.secondIds.filter(item => !data.firstIds.includes(item) && !ownId.includes(item));
      const allIdsClean = data.allIds.filter(item => !data.firstIds.includes(item) && !secondIdsClean.includes(item) && !ownId.includes(item));
      const firstFollowers = data.allUsers.filter(item => data.firstIds.includes(item._id));
      const secondFollowers = data.allUsers.filter(item => secondIdsClean.includes(item._id));
      const rest = data.allUsers.filter(item => allIdsClean.includes(item._id));
      setFollowers(firstFollowers);
      setFollowersOfFollowers(secondFollowers);
      setRestOfUsers(rest);
      setLoading(false);
    }

    function getUsersOnFire(likes) {
      const duplicates = likes.reduce((acc, obj) => {
        const duplicate = acc.find(item => item.id === obj.post.id);
        if (duplicate) {
          duplicate.authors.push(obj.post.author);
        } else {
          acc.push({
            id: obj.post.id,
            authors: [obj.post.author]
          });
        }
        return acc;
      }, []);     
      const duplicateAuthors = duplicates
        .filter(item => item.authors.length >= 2)
        .flatMap(item => item.authors);
      setUsersOnFire(duplicateAuthors)
    }

    useEffect(() => {
      if(!userInfo){
        return
      };
      axios.get('/api/exploreusers').then(response => {
        filterUsers(response.data);
        getUsersOnFire(response.data.likes);
      })
    }, [userInfo]);

    return (
      <Layout>
        {loading ? (<Loading/>) : ( 
          <div className="mx-4 flex flex-col">
            {followers.length > 0 && (
            <div>
              <h2 className='mt-8 mb-2 text-2xl font-bold'>The garbage you follow</h2>
              <div className='grid grid-cols-2 py-8 gap-y-8 pl-2 border border-litterBorder rounded-lg'>
                {followers.map(follower => (
                  <Link href={`/${follower.username}`} key={follower._id}>
                    <div className='flex items-center'>
                      {usersOnFire.includes(follower._id) ? (<UserIcon color={follower.userColor} onFire={true}/>) : (<UserIcon color={follower.userColor}/>)}
                      <div className='flex flex-col ml-1 mt-4'>
                        <p className="text-2xl font-bold">{follower.username}</p>
                        <p className="text-lg text-litterLightGray">{follower.postCount} {follower.postCount === 1 ? 'post' : 'posts'}</p>
                      </div>            
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            )}
            {followersOfFollowers.length > 0 && (
            <div>
              <h2 className='mt-4 mb-2 text-xl font-bold'>The garbage followed by the garbage you follow</h2>
              <div className='grid grid-cols-3 py-8 gap-y-6 pl-2 border border-litterBorder rounded-lg'>
                {followersOfFollowers.map(follower => (
                  <Link href={`/${follower.username}`} key={follower._id}>
                    <div className='flex items-center'>
                      {usersOnFire.includes(follower._id) ? (<UserIcon color={follower.userColor} onFire={true} mid/>) : (<UserIcon color={follower.userColor} mid/>)}           
                      <div className='flex flex-col ml-1 mt-4'>
                        <p className="text-lg font-bold">{follower.username}</p>
                        <p className="text-base text-litterLightGray">{follower.postCount} {follower.postCount === 1 ? 'post' : 'posts'}</p>
                      </div> 
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            )}
            <h2 className='mt-4 mb-2 font-bold text-lg'>The remaining garbage</h2>
            <div className='grid grid-cols-4 py-8 gap-y-4 pl-2 border border-litterBorder rounded-lg'>
              {restOfUsers.length > 0 && restOfUsers.map(user => (
                <Link href={`/${user.username}`} key={user._id}>
                  <div className='flex items-center'>
                  {usersOnFire.includes(user._id) ? (<UserIcon color={user.userColor} onFire={true} small/>) : (<UserIcon color={user.userColor} small/>)}
                    <div className='flex flex-col ml-1 mt-4'>
                      <p className="text-base font-bold">{user.username}</p>
                      <p className="text-sm text-litterLightGray">{user.postCount} {user.postCount === 1 ? 'post' : 'posts'}</p>
                    </div>            
                  </div>
                </Link>
              ))}
            </div>
          </div>)
        }
      </Layout>
    )
  }