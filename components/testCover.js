import CoverPicture from "./CoverPicture"
import UserIcon from "./UserIcon"

export default function Cover(profileInfo) {
    return (
        <div>
            <CoverPicture src={profileInfo?.cover}/>
            <div className="flex justify-between mb-14">
                <div className="relative ml-5">
                    <div className="flex items-center absolute -top-14">
                        <UserIcon color={profileInfo.userColor}/>
                        <h1 className="text-2xl font-bold mt-8">{profileInfo.username}</h1>
                    </div>
                </div>
                <button className="mt-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                    Follow
                </button>
            </div>
        </div>
    )
}