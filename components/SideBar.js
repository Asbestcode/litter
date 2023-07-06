import Link from 'next/link';
import {useSession, signOut} from 'next-auth/react'
import useUserInfo from "../hooks/useUserInfo";
import {useRouter} from "next/router";
import UserIcon from "./UserIcon"

export default function SideBar() {
  const {data:session} = useSession();
  const {userInfo, setUserInfo} = useUserInfo();
  const router = useRouter();

  async function logOut() {
    setUserInfo(null);
    await signOut();
  }
  const profilePath = router.pathname === '/[username]';
  const loginPath = router.pathname ==='/login';

  if (loginPath) {
    return <div></div>
  }

  return (
      <div className='sticky top-6 p-4 flex flex-col gap-2 items-center w-28'>
        <div className='bg-litterWhite rounded-md p-4 w-28 h-30'>
          {userInfo && (
            <Link href={`/${userInfo?.username}`}>
              <div className='cursor-pointer flex flex-col items-center'>
                <UserIcon color={userInfo?.userColor} small/>
                <p className="font-bold text-base">{userInfo?.username}</p>
              </div>
            </Link>
          )}
        </div>
        <div className='bg-litterWhite flex flex-col gap-4 items-center rounded-md px-4 py-6 w-28'>
          <Link href={'/'}>
            <span className={(router.pathname === '/' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Home</span>
          </Link>
          <Link href={'/explore'}>
            <span className={(router.pathname === '/explore' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Explore</span>
          </Link>
        </div>
        <div className='bg-litterWhite gap-4 flex justify-center rounded-md px-4 py-3 w-28'>
          <button onClick={logOut} className='border border-gray-800 px-3 py-1 rounded-md text-gray-800 pb-1 text-sm'>
            Log out
          </button>
        </div>
      </div>
  )
}

{/* <p className={(profilePath ? 'border-litterBlue' : 'border-black')+" p-2 rounded-md border font-bold text-lg cursor-pointer"}>{userInfo?.username}</p> */}