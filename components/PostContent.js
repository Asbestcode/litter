import ReactTimeAgo from "react-time-ago";
import Link from "next/link";
import PostButtons from "./PostButtons";

const Linkify = ({children})=> {
  if(children.includes('http')) {
    const isUrl = word => {
        const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
        return word.match(urlPattern)
    }
    const addMarkup = word => {
        return isUrl(word) ? 
            `<a href="${word}" target="_blank" style="text-decoration:underline">${word}</a>`:  
            word
    }
    const words = children.split(' ')
    const formatedWords = words.map( w => addMarkup(w))
    const html = formatedWords.join(' ')
    return (<span dangerouslySetInnerHTML={{__html: html}} />)
  } else {
    const isUrl = word => {
      const urlPattern = /^(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
      return word.match(urlPattern)
    }
    const addMarkup = word => {
        return isUrl(word) ? 
            `<a href="https://${word}" target="_blank" style={{textDecoration:"underline"}}>${word}</a>`:  
            word
    }
    const words = children.split(' ')
    const formatedWords = words.map( w => addMarkup(w))
    const html = formatedWords.join(' ')
    return (<span dangerouslySetInnerHTML={{__html: html}} />)
  }
}

export default function PostContent({
    text, createdAt, author, _id, images,
    likesCount, likedByUser, commentsCount,
    big=false, isUserPage=false, single=false}) {

    function showImages(big, commentsCount, single) {
      if (!images?.length) {
        return '';
      }
      if (big) {
        return (
          <div className="flex flex-col gap-1">
            {images.length > 0 && images.map(img => (
              <div className="m-1" key={img.id}>
                <img className={(single ? 'max-h-40' : '')} src={img.src} alt=""/>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex -mx-1">
            {images.length > 0 && images.map(img => (
              <div className="m-1" key={img.id}>
                <img src={img.src} className={(commentsCount > 0 && !single ? 'max-h-40' : 'max-h-80')} alt=""/>
              </div>
            ))}
          </div>
        );
      }
    }

    return (
        <div className="">
            <div className="mb-2">
                {!isUserPage && createdAt && (<>
                    <Link href={'/'+author?.username} className="font-bold">{author?.username}</Link>
                    <span className="pl-1 text-litterLightGray">
                        · <ReactTimeAgo date={Date.parse(createdAt)} />
                    </span>
                </>)}
            </div>
            {!big && (
                <Link href={`/${author?.username}/status/${_id}`} className="flex bg-white rounded p-2 mb-1">
                  <div className="flex flex-col gap-2">
                    <Linkify>{text}</Linkify>
                    {showImages(big, commentsCount, single)}
                  </div>
                </Link>
            )}
            {big && (
                <div className="flex flex-col gap-2 bg-white rounded p-2 mb-1">
                    <Linkify>{text}</Linkify>
                    {showImages(big, commentsCount, single)}
                </div>
            )}
            <PostButtons 
              id={_id} 
              likesCount={likesCount} 
              likedByUser={likedByUser}
              commentsCount={commentsCount}
              username={author?.username}
            />
        </div>
    )
}