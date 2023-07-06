export default function Loading() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
          <img src="/loading.gif" alt="" style={{filter: 'grayscale(100%)'}}></img>
          <p className="text-4xl">Loading...</p>
        </div>
    )
}