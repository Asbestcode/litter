import ReactTimeAgo from "react-time-ago";
import Link from "next/link";

export default function PostContent({text, createdAt, author, _id, big=false }) {
    return (
        <div className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
            {big?'YES MUDDERFICKER':'NE NE NE NE NE'}
            <div className="mb-2">
                <Link href={'/'+author?.username} className="font-bold">{author?.username}</Link>
                <span className="pl-1 text-litterLightGray">
                    · <ReactTimeAgo date={Date.parse(createdAt)} />
                </span>
            </div>
            <Link href={`/${author?.username}/status/${_id}`} className="flex bg-white rounded p-2 mb-1">
                {text}
            </Link>
        </div>
    )
}

{/* <span className="pl-1 text-litterLightGray">{(new Date(createdAt))
    .toISOString()
    .replace('T', ' ')
    .slice(0,16)
    .split(' ')
    .join(' ')}
</span> */}