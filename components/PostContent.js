import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({
    text, createdAt, author, _id, 
    likesCount, likedByUser, commentsCount,
    big=false}) {
    return (
        <div className="">
            <div className="mb-2">
                <Link href={'/'+author?.username} className="font-bold">{author?.username}</Link>
                {!big && (
                    <span className="pl-1 text-litterLightGray">
                        · <ReactTimeAgo date={Date.parse(createdAt)} />
                    </span>
                )}
                {big && (
                    <span className="pl-1 text-litterLightGray text-sm">
                        <br/>
                        {(new Date(createdAt))
                            .toISOString()
                            .replace('T', ' ')
                            .slice(0,16)
                            .split(' ')
                            .reverse()
                            .join(' ')
                        }
                    </span>
                )}
            </div>
            {!big && (
                <Link href={`/${author?.username}/status/${_id}`} className="flex bg-white rounded p-2 mb-1">
                    {text}
                </Link>
            )}
            {big && (
                <div className="flex bg-white rounded p-2 mb-1">
                    {text}
                </div>
            )}
            <PostButtons 
                id={_id} 
                likesCount={likesCount} 
                likedByUser={likedByUser}
                commentsCount={commentsCount}
            />
        </div>
    )
}