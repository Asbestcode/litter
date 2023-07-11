import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Loading from '@/components/Loading';
import UserIcon from '../components/UserIcon';
import Link from 'next/link';

export default function Explore() {
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
        const duplicate = acc.find(item => item?.id === obj.post?.id);
        if (duplicate) {
          duplicate.authors.push(obj.post?.author);
        } else {
          acc.push({
            id: obj.post?.id,
            authors: [obj.post?.author]
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
            <div className=''>
              <h2 className='mt-2 sm:mt-8 mb-4 text-2xl text-litterLightGray text-center'>The garbage you follow</h2>
              <div className='flex flex-wrap gap-x-10 gap-y-4 p-4 border border-litterLightGray rounded-lg'>
                {followers.map(follower => (
                  <Link href={`/${follower.username}`} key={follower._id}>
                    <div className='flex sm:flex-row flex-col items-center'>
                        {usersOnFire?.includes(follower._id) ? (
                          <div className='h-28 sm:h-36 flex relative'>
                            <UserIcon color={follower.userColor} onFire={true}/>
                          </div>
                          ) : (
                          <div className='h-28 sm:h-36 flex shrink'>
                            <UserIcon color={follower.userColor}/>
                          </div>
                        )}
                      <div className='flex flex-col items-center sm:items-start sm:ml-1 sm:mt-4'>
                        <p className="text-xl font-bold whitespace-nowrap">{follower.username}</p>
                        <p className="text-lg text-litterLightGray whitespace-nowrap">{follower.postCount} {follower.postCount === 1 ? 'post' : 'posts'}</p>
                      </div>            
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            )}
            {followersOfFollowers.length > 0 && (
            <div className=''>
              <h2 className='mt-8 mb-4 text-xl text-litterLightGray text-center'>The garbage followed by the garbage you follow</h2>
              <div className='flex flex-wrap justify-around p-4 gap-y-6 gap-x-8 border border-litterLightGray rounded-lg'>
                {followersOfFollowers.map(follower => (
                  <Link href={`/${follower.username}`} key={follower._id}>
                    <div className='flex sm:flex-row flex-col items-center'>
                      <div className='h-20 sm:h-28 flex shrink'>
                        {usersOnFire?.includes(follower._id) ? (<UserIcon color={follower.userColor} onFire={true}/>) : (<UserIcon color={follower.userColor}/>)}
                      </div>
                      <div className='flex flex-col items-center sm:items-start sm:ml-1 sm:mt-4'>
                        <p className="text-lg font-bold whitespace-nowrap">{follower.username}</p>
                        <p className="text-base text-litterLightGray whitespace-nowrap">{follower.postCount} {follower.postCount === 1 ? 'post' : 'posts'}</p>
                      </div> 
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            )}
            {restOfUsers.length > 0 && (<>
              <h2 className='mt-8 mb-4 text-lg text-litterLightGray text-center'>The remaining garbage</h2>
              <div className='flex flex-wrap p-4 gap-y-4 gap-x-6 border border-litterLightGray rounded-lg'>
                {restOfUsers.map(user => (
                  <Link href={`/${user.username}`} key={user._id}>
                    <div className='flex sm:flex-row flex-col items-center'>
                        {usersOnFire?.includes(user._id) ? (
                          <div className='h-16 sm:h-20 flex shrink'>
                            <UserIcon color={user.userColor} onFire={true}/>
                          </div>
                        ) : (
                          <div className='h-16 sm:h-20 flex shrink'>
                            <UserIcon color={user.userColor}/> 
                          </div>
                        )}
                      <div className='flex flex-col items-center sm:items-start sm:ml-1 sm:mt-4'>
                        <p className="text-base font-bold whitespace-nowrap">{user.username}</p>
                        <p className="text-sm text-litterLightGray whitespace-nowrap">{user.postCount} {user.postCount === 1 ? 'post' : 'posts'}</p>
                      </div>            
                    </div>
                  </Link>
                ))}
              </div>
            </>)}
          </div>)
        }
      </Layout>
    )
  }