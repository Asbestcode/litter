import Link from 'next/link';
import {useRouter} from "next/router";
// import { useAppContext } from '../context/state';
import {useDaysLeftStore} from '../stores/useDaysLeftStore'


export default function RightBar() {
  // const { daysLeft, setDaysLeft } = useAppContext()
  const daysLeft = useDaysLeftStore((state) => state.days);
  const router = useRouter();

  return (
      <div className='fixed right-10 top-10 bg-litterWhite p-4 rounded-md flex flex-col gap-4'>
          {daysLeft && (
            <span className="text-lg">
              {daysLeft} days left
            </span>
          )}
        <Link href={'/dump'}>
          <span className={(router.pathname === '/dump' ? 'text-litterBlue' : 'text-black')+" font-bold text-lg cursor-pointer"}>Dump</span>
        </Link>
      </div>
  )
}