import ReactTimeAgo from "react-time-ago";

export default function PostContent({text, createdAt, author}) {
    return (
        <div className="flex flex-col">
            <div className="">
                <span className="">{author.username}</span>
            </div>
            <div className="flex">
                {text}
            </div>
        </div>
    )
}

{/* <span className="pl-1 text-litterLightGray">
<ReactTimeAgo date={createdAt} />
</span> */}

{/* <span className="pl-1 text-litterLightGray">{(new Date(createdAt))
    .toISOString()
    .replace('T', ' ')
    .slice(0,16)
    .split(' ')
    .join(' ')}
</span> */}