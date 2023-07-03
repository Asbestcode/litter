import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import PostButtons from "./PostButtons";

export default function PostContent({
    text, createdAt, author, _id, images,
    likesCount, commentsCount,
    big=false}) 
    // likedByUser
    {

    function showImages() {
      if (!images?.length) {
        return '';
      }
      if (big) {
        return (
          <div className="flex flex-col gap-1">
            {images.length > 0 && images.map(img => (
              <div className="m-1" key={img.id}>
                <img src={img.src} alt=""/>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex -mx-1">
            {images.length > 0 && images.map(img => (
              <div className="m-1" key={img.id}>
                <img src={img.src} className="max-h-80" alt=""/>
              </div>
            ))}
          </div>
        );
      }
    }

    return (
        <div className="">
            <div className="mb-2">
                <Link href={'/'+author?.username} className="font-bold">{author?.username}</Link>
                {createdAt && (
                    <span className="pl-1 text-litterLightGray">
                        · <ReactTimeAgo date={Date.parse(createdAt)} />
                    </span>
                )}
            </div>
            {!big && (
                <Link href={`/${author?.username}/status/${_id}`} className="flex bg-white rounded p-2 mb-1">
                  <div>
                    {text}
                    {showImages(big)}
                  </div>
                </Link>
            )}
            {big && (
                <div className="flex bg-white rounded p-2 mb-1">
                    {text}
                    {showImages(big)}
                </div>
            )}
            <PostButtons 
                id={_id} 
                likesCount={likesCount} 
                // likedByUser={likedByUser}
                commentsCount={commentsCount}
                username={author?.username}
            />
        </div>
    )
}