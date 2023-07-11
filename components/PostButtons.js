import { useState } from "react"
import axios from "axios"
import Link from "next/link"

export default function PostButtons({
    likesCount:likesCountDefault=0,
    likedByUser:likedByUserDefault=false,
    id, commentsCount, username
}) {
    const [likesCount, setLikesCount] = useState(likesCountDefault)
    const [likedByUser, setLikedByUser] = useState(likedByUserDefault)

    async function toggleLike() {
        const response = await axios.post('/api/likes', {id})
        if (response.data?.like) {
            setLikedByUser(true)
            setLikesCount(prev => prev + 1)
        } else {
            setLikedByUser(false)
            setLikesCount(prev => prev - 1)
        }
    }

    return (
        <div className="flex gap-4 text-litterLightGray text-sm mt-1">
            <button className="flex items-center" onClick={toggleLike}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                    <path className={(likedByUser ? 'text-black fill-red-500 ' : '')} strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path className={(likedByUser ? 'text-yellow-500 fill-yellow-500 ' : '')} strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                </svg>
                <span>{likesCount}</span>
            </button>
            <Link href={`/${username}/status/${id}`}>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <span>{commentsCount}</span>
                </div>
            </Link>
        </div>
    )
}