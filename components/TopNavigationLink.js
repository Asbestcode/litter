import Link from "next/link"

export default function TopNavigationLink({navTitle=''}) {
    return (
        <div className="">
            <Link href={`/${navTitle}`}>
                <div className="flex items-center mb-4 ml-4 pt-2 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    <span className="font-bold text-lg">{navTitle}</span>
                </div>
            </Link>
        </div>
    )
}