import Link from 'next/link';
import {useRouter} from "next/router";
import {useDaysLeftStore} from '../stores/useDaysLeftStore'
import GarbageTruck from './GarbageTruck';

export default function RightBar() {
  const daysLeft = useDaysLeftStore((state) => state.days);
  const router = useRouter();

  const loginPath = router.pathname ==='/login';

  return (
    <div className='sticky top-6 p-4 flex flex-col gap-2 items-center w-32'>
      {loginPath && (
        <div className='bg-litterWhite rounded-md p-4 w-32 flex flex-col items-center'>
          <GarbageTruck/>
          <p className="block font-bold text-base mt-2">
            {daysLeft} {daysLeft === 1 ? 'day left' : 'days left'}
          </p>
        </div>
      )}
      {!loginPath && (
        <Link href={'/landfill'}>
          <div className='bg-litterWhite rounded-md p-4 w-32 flex flex-col items-center'>
            <GarbageTruck/>
            <p className="block font-bold text-base mt-2">
              {daysLeft} {daysLeft === 1 ? 'day left' : 'days left'}
            </p>
          </div>
        </Link>  
      )}
    </div>
  )
}