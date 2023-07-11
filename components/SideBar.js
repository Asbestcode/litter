import Link from 'next/link';
import {signOut} from 'next-auth/react'
import useUserInfo from "../hooks/useUserInfo";
import {useRouter} from "next/router";
import UserIcon from "./UserIcon"
import { useUserColorStore } from '@/stores/useUserColorStore';

export default function SideBar() {
  const {setUserInfo} = useUserInfo();
  const userColor = useUserColorStore((state) => state.userColor);
  const userName = useUserColorStore((state) => state.userName);
  const router = useRouter();

  async function logOut() {
    setUserInfo(null);
    await signOut({ callbackUrl: '/' });
  }

  const loginPath = router.pathname ==='/login';

  return (
      <div className='sticky top-6 p-4 flex flex-col gap-2 items-center w-28'>
        <div className='bg-litterWhite rounded-md p-4'>
          {loginPath && (
            <div className='cursor-pointer flex flex-col items-center w-20'>
              <div className='flex h-16'>
                <UserIcon color='#fff'/>
              </div>
              <p className="mt-1 block font-bold text-base">Litter</p>
            </div>
          )}
          {!loginPath && (
            <Link href={`/${userName}`}>
              <div className='cursor-pointer flex flex-col items-center w-20'>
                <div className='flex h-16'>
                  <UserIcon color={userColor}/>
                </div>
                <p className="mt-1 block font-bold text-base">{userName}</p>
              </div>
            </Link>
          )}
        </div>
        {loginPath && (
          <div className='bg-litterWhite flex flex-col gap-4 items-center rounded-md px-4 py-6 w-28'>
              <span className={(router.pathname === '/' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Home</span>
              <span className={(router.pathname === '/explore' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Explore</span>
          </div>
        )}
        {!loginPath && (
          <div className='bg-litterWhite flex flex-col gap-4 items-center rounded-md px-4 py-6 w-28'>
            <Link href={'/'}>
              <span className={(router.pathname === '/' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Home</span>
            </Link>
            <Link href={'/explore'}>
              <span className={(router.pathname === '/explore' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Explore</span>
            </Link>
          </div>
        )}
        {loginPath && (
          <div className='bg-litterWhite gap-4 flex justify-center rounded-md px-4 py-3 w-28'>
            <button disabled onClick={logOut} className='border border-gray-800 px-3 py-1 rounded-md text-gray-800 pb-1 text-sm'>
              Log out
            </button>
          </div>    
        )}
        {!loginPath && (
          <div className='bg-litterWhite gap-4 flex justify-center rounded-md px-4 py-3 w-28'>
            <button onClick={logOut} className='border border-gray-800 px-3 py-1 rounded-md text-gray-800 pb-1 text-sm'>
              Log out
            </button>
          </div>
        )}
      </div>
  )
}