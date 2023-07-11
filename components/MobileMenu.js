import UserIcon from "./UserIcon"
import GarbageTruck from "./GarbageTruck"
import Link from "next/link"
import useUserInfo from "@/hooks/useUserInfo"

export default function MobileMenu() {
    const {userInfo} = useUserInfo();

    return (
        <div className="flex justify-between items-center h-12">
            <Link href={`/${userInfo?.username}`}>
                <div className="h-20 flex p-5 ml-3">
                    <UserIcon color='#fff' menu/>
                </div>
            </Link>
            <Link href={'/'}>
                <span className="text-litterDarkGray font-bold text-lg cursor-pointer mr-2">
                    Home
                </span>
            </Link>
            <Link href={'/explore'}>
                <span className="text-litterDarkGray font-bold text-lg cursor-pointer ml-2">
                    Explore
                </span>
            </Link>
            <Link href={'/landfill'}>
                <div className="h-20 flex p-5 mr-3">
                    <GarbageTruck/>
                </div>
            </Link>
        </div>
    )
}