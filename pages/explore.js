import {useSession} from 'next-auth/react';
import useUserInfo from "../hooks/useUserInfo";
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import Layout from '../components/Layout';
import UserIcon from '../components/UserIcon';
import Link from 'next/link';

export default function Explore() {
    const {data:session} = useSession();
    const {userInfo} = useUserInfo();
    const [followers, setFollowers] = useState([]);
    const [followersOfFollowers, setFollowersOfFollowers] = useState([]);
    const [restOfUsers, setRestOfUsers] = useState([]);

    function filterUsers(data) {
      const allUserData = data.allUsers;
      const own = userInfo._id;
      const first = data.firstIds;
      const second = data.secondIds;
      const all = data.allIds;
      const secondClean = second.filter(item => !first.includes(item) && !own.includes(item));
      const allClean = all.filter(item => !first.includes(item) && !secondClean.includes(item) && !own.includes(item));
      const firstFollowers = allUserData.filter(item => first.includes(item._id));
      const secondFollowers = allUserData.filter(item => secondClean.includes(item._id));
      const rest = allUserData.filter(item => allClean.includes(item._id));
      setFollowers(firstFollowers);
      setFollowersOfFollowers(secondFollowers);
      setRestOfUsers(rest);
    }

    useEffect(() => {
      if(!userInfo){
        return
      };
      axios.get('/api/exploreusers').then(response => {
        filterUsers(response.data)
      })
    }, [userInfo]);

    const dummyColor = '#fff'

    return (
      <Layout>
          <div className="mx-4 flex flex-col">
            <h2 className='mt-8 border-b border-litterBorder'>The garbage you follow</h2>
            <div className='grid grid-cols-2 py-8 gap-y-8 ml-2'>
              {followers.length > 0 && followers.map(follower => (
                <Link href={`/${follower.username}`} key={follower._id}>
                  <div className='flex items-center'>
                    <UserIcon color={follower.userColor}/>            
                    <p className="text-2xl font-bold ml-1">{follower.username}</p>
                  </div>
                </Link>
              ))}
            </div>
            <h2 className='border-b border-litterBorder'>The garbage followed by the garbage you follow.</h2>
            <div className='grid grid-cols-3 py-8 gap-y-6 ml-2'>
              {followersOfFollowers.length > 0 && followersOfFollowers.map(follower => (
                <Link href={`/${follower.username}`} key={follower._id}>
                  <div className='flex items-center'>
                    <UserIcon color={follower.userColor} mid/>            
                    <p className="text-lg font-bold ml-1">{follower.username}</p>
                  </div>
                </Link>
              ))}
            </div>
            <h2 className='border-b border-litterBorder'>The remaining garbage</h2>
            <div className='grid grid-cols-4 py-8 gap-y-4 ml-2'>
              {restOfUsers.length > 0 && restOfUsers.map(user => (
                <Link href={`/${user.username}`} key={user._id}>
                  <div className='flex items-center'>
                    <UserIcon color={user.userColor} small/>            
                    <p className="text-sm font-bold ml-1">{user.username}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </Layout>
    )
  }