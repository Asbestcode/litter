import Link from 'next/link';
import {signOut} from 'next-auth/react'
import useUserInfo from "../hooks/useUserInfo";
import {useRouter} from "next/router";

export default function SideBar() {
  const {userInfo, setUserInfo} = useUserInfo();
  const router = useRouter();

  async function logOut() {
    setUserInfo(null);
    await signOut();
  }

  const profilePath = router.pathname === '/[username]';

  return (
      <div className='fixed left-10 top-10 bg-litterWhite p-4 rounded-md flex flex-col gap-4'>
        <Link href={'/'}>
          <span className={(router.pathname === '/' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Home</span>
        </Link>
        <Link href={'/explore'}>
          <span className={(router.pathname === '/explore' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Explore</span>
        </Link>
        <Link href={`/${userInfo?.username}`}>
          <span className={(profilePath ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Profile</span>
        </Link>
        <button onClick={logOut} className='bg-litterBorder px-3 py-1 rounded-full text-white'>
          Log out
        </button>
      </div>
  )
}