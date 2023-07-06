import Link from 'next/link';
import {useRouter} from "next/router";
import {useDaysLeftStore} from '../stores/useDaysLeftStore'
import GarbageTruck from './GarbageTruck';

export default function RightBar() {
  const daysLeft = useDaysLeftStore((state) => state.days);
  const router = useRouter();

  const loginPath = router.pathname ==='/login';

  if (loginPath) {
    return <div></div>
  }

  return (
    <div className='sticky top-6 p-4 flex flex-col gap-2 items-center w-32'>
      <Link href={'/dump'}>
        <div className='bg-litterWhite rounded-md p-4 w-32 flex flex-col items-center'>
          <GarbageTruck/>
          <p className="font-bold text-base mt-2">
            {daysLeft} {daysLeft === 1 ? 'day left' : 'days left'}
          </p>
        </div>
      </Link>  
      {/* <div className='bg-litterWhite rounded-md p-4 w-32 flex justify-center'>
        <Link href={'/dump'}>
          <span className={(router.pathname === '/dump' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Dump</span>
        </Link>
      </div> */}
    </div>
  )
}